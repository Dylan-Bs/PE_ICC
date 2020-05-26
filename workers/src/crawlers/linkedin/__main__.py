from crawlers.linkedin.crawler import LinkedinCrawler
from crawlers.safe import SafeCrawler

print('`sudo apt install chromium-driver` to use selenium')
print('Use LinkedinCrawler(headless=True) to hide browser')

crawler = SafeCrawler(
    lambda: LinkedinCrawler(headless=False),
    ('angivare-bot@yahoo.com', 'CODE_COM1'),
    lazy=False
)

try:
    url = crawler.find_user_url('Wassila Sabbagh')
    ret = crawler.crawl_page(url)

    if ret is None:
        print('No results')
        exit(1)

    for key in ret:
        print(f'{key.upper()}:')
        print(ret[key])
        print('---------------')
finally:
    crawler.driver.quit()
