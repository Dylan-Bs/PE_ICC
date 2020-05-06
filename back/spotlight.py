from requests import get
from functools import partial

from typing import Union

URL = 'http://localhost:2225/rest'

def annotate(text: Union[str, list], types: list = None, confidence=0.5, support=0):
    if type(text) in (list, tuple):
        annotate_one = partial(annotate,
            types=types, confidence=confidence, support=support
        )

        return next((
            candidates
            for candidates
            in map(annotate_one, text)
            if candidates
        ), None)

    params = {
        'text': text,
        'confidence': confidence,
        'support': support
    }

    if types: params = { **params,
        'types': ','.join(types),
        'policy': 'whitelist'
    }

    resp = get(f'{URL}/annotate', params)

    if resp.status_code == 200:
        json = resp.json()
        return json['Resources'] if 'Resources' in json else []
    else:
        print('Error while calling dbpedia-spotlight')
        print(f'status: {resp.status_code}. body:\n{resp.content}')
        return None

if __name__ == '__main__':
    res = annotate('the Apple co. is a very big company with lots of money!')
    print(res)
