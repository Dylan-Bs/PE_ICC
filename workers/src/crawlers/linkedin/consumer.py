from crawlers.linkedin.crawler import LinkedinCrawler
from crawlers.safe import SafeCrawler, retry

import pika
import pymongo
from queue import Queue
import json
from datetime import datetime, timedelta
from functools import partial
from os import environ

mongo = pymongo.MongoClient(
    f"mongodb://{environ['MONGO_USER']}:{environ['MONGO_PASS']}@mongo"
)
db = mongo.get_database('pe_database')


crawler = SafeCrawler(
    lambda: LinkedinCrawler(headless=True),
    login_args=('angivare-bot@yahoo.com', 'CODE_COM1'),
    lazy=False
)

def commit(student_id, changes):
    return db.student.update_one(
        {'id': student_id},
        {'$set': changes}
    )

def crawl_one(delivery_tag, student_id, url, first_name, last_name):
    try:
        now = datetime.now()

        old = db.tasks.find_one(
            {'id': student_id},
            sort=[('date', -1)]
        )

        if old and old['status'] == 'doing':
            print(f'Already crawling {student_id}: skipping')
        elif old and old['status'] == 'done' and old['date'] > now - timedelta(seconds=2):
            print(f'Already crawled {student_id} less than 2 seconds ago: skipping')
        else:
            db.tasks.replace_one(
                {'id': student_id},
                {
                    'id': student_id,
                    'date': now,
                    'status': 'doing',
                },
                upsert=True
            )

            old_url = url
            if not url:
                url = crawler.find_user_url(f'{first_name} {last_name}')

            res = crawler.crawl_page(url)

            if res:
                changes = {}
                if res['company'] != None:
                    changes['company'] = res['company']
                if res['work_place'] != None:
                    changes['working_city'] = res['work_place']
                if not old_url and url:
                    changes['linkedin_url'] = url

                retry(2, pymongo.errors.AutoReconnect,
                    partial(commit, student_id, changes), None,
                    'Connection to mongo lost. Retrying...'
                )

            db.tasks.replace_one(
                {'id': student_id},
                {
                    'id': student_id,
                    'date': datetime.now(),
                    'status': 'done',
                },
                upsert=True
            )
    except:
        rmq_conn.add_callback_threadsafe(
            partial(channel.basic_nack, delivery_tag)
        )

        raise

    rmq_conn.add_callback_threadsafe(
        partial(channel.basic_ack, delivery_tag)
    )


queue = Queue(1)

def consume(ch, method, prop, body):
    msg = json.loads(body)

    student_id, url = msg['student_id'], msg['url']
    first_name, last_name = msg['first_name'], msg['last_name']

    queue.put((method.delivery_tag, student_id, url, first_name, last_name))

rmq_conn = pika.BlockingConnection(
    pika.ConnectionParameters(
        'rabbitmq',
        credentials=pika.PlainCredentials(
            environ['RMQ_USER'], environ['RMQ_PASS']
        )
))

channel = rmq_conn.channel()
channel.basic_qos(prefetch_count=1)
channel.queue_declare(queue='crawl')

channel.basic_consume(
    queue='crawl',
    auto_ack=False,
    on_message_callback=consume
)

from threading import Thread

consumer_thread = Thread(target=channel.start_consuming)
consumer_thread.start()

print('Linkedin consumer listening...')

while True:
    args = queue.get()
    crawl_one(*args)
