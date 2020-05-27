from argparse import ArgumentParser
from importlib import import_module
from os import environ
import time

time.sleep(120)
parser = ArgumentParser()
parser.add_argument(
    '-p', '--provider', type=str,
    default=environ.get('PROVIDER', 'linkedin')
)
args = parser.parse_args()

print(f'Launching {args.provider} crawler...')
import_module(f'crawlers.{args.provider}.consumer')
