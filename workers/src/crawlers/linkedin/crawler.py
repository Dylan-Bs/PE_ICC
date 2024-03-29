from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.common.exceptions import TimeoutException, WebDriverException

from services.spotlight import annotate

from functools import partial
import json

URL = "https://www.linkedin.com/"

class LinkedinCrawler:
    def __init__(self, headless=False):
        opts = webdriver.chrome.options.Options()
        if headless:
            opts.add_argument('--headless')
        opts.add_experimental_option('prefs', {'intl.accept_languages': 'fr,fr_FR'})
        opts.add_argument('--lang=fr')
        opts.add_argument('--no-sandbox')
        self.driver = webdriver.Chrome(options=opts)
        self.wdriver = WebDriverWait(self.driver, 30)

    def login(self, username, password):
        print('Crawler logging in...')

        self.driver.get(URL)

        login_btn = self.wdriver.until(
            EC.element_to_be_clickable((
                By.CSS_SELECTOR,
                '.nav > [data-tracking-control-name="guest_homepage-basic_nav-header-signin"]'
            ))
        )
        (ActionChains(self.driver)
            .pause(1.5)
            .click(login_btn)
        ).perform()

        uname_field = self.wdriver.until(
            EC.element_to_be_clickable((
                By.CSS_SELECTOR,
                'input#username'
            ))
        )

        (ActionChains(self.driver)
            .pause(0.5)
            .send_keys(username)
            .pause(0.2)
            .key_down(Keys.TAB).key_up(Keys.TAB)
            .pause(0.2)
            .send_keys(password)
            .pause(0.2)
            .key_down(Keys.ENTER).key_up(Keys.ENTER)
        ).perform()

        try:
            skip_phone_sec_btn = WebDriverWait(self.driver, 5).until(
                EC.element_to_be_clickable((
                    By.CSS_SELECTOR,
                    '.cp-challenge .cp-footer-content .secondary-action'
                ))
            )
            (ActionChains(self.driver)
                .pause(0.5)
                .click(skip_phone_sec_btn)
            ).perform()
        except TimeoutException:
            print('No phone verification this time')
            pass

        nav_prof = self.wdriver.until(
            EC.presence_of_element_located((
                By.ID,
                'launchpad-wormhole'
            ))
        )

        print('Crawler logged in!')

    def find_user_url(self, query):
        print(f'Crawler finding URL for {query}...')
        self.driver.get(f'{URL}/feed/')

        profile_bg = self.wdriver.until(
            EC.presence_of_element_located((
                By.CSS_SELECTOR,
                'input.search-global-typeahead__input'
            ))
        )

        search_box = self.driver.find_element_by_css_selector(
            'input.search-global-typeahead__input'
        )

        (ActionChains(self.driver)
            .click(search_box)
            .pause(6)
            .send_keys(query)
            .pause(1)
            .send_keys(Keys.ARROW_DOWN)
            .pause(0.1)
            .send_keys(Keys.ENTER)
        ).perform()

        profile_bg = self.wdriver.until(
            EC.presence_of_element_located((
                By.CSS_SELECTOR,
                '.profile-background-image'
            ))
        )


        print(f'Crawler found URL for {query}: {self.driver.current_url}')
        return self.driver.current_url

    def crawl_page(self, url):
        print(f'Crawler crawling page {url} ...')
        self.driver.get(url)

        profile_bg = self.wdriver.until(
            EC.presence_of_element_located((
                By.CSS_SELECTOR,
                '.profile-background-image'
            ))
        )
        
        data = {}

        try:
            # raise WebDriverException('Dummy error to skip DOM analysis')

            company_box = self.driver.find_element_by_css_selector(
                '.pv-top-card--experience-list li:first-child span'
            )

            location_box = self.driver.find_element_by_css_selector(
                '.pv-top-card--list-bullet li:first-child'
            )

            res = {
                'company': company_box.text,
                'work_place': location_box.text
            }
        except WebDriverException as e:
            print('Could not extract specific DOM elements', e)
            print('Falling back to more general analysis...')

            try:
                big_box = self.driver.find_element_by_css_selector(
                    'main.core-rail'
                )

                top_box = self.driver.find_element_by_css_selector(
                    '.pv-top-card > .ph5.pb5 > .mt2'
                )

                bg_box = self.driver.find_element_by_id('oc-background-section')

                texts = (
                    top_box.text,
                    bg_box.text,
                    big_box.text
                )
            except WebDriverException as e:
                print('Could not extract general web elements', e)
                return None
            
            company_candidates  = annotate(texts, ['dbo:Company', 'DBpedia:Company', 'DBpedia:Organisation'])
            place_candidates = annotate(texts, ['DBpedia:Location', 'DBpedia:Place'])
            
            if not company_candidates and not place_candidates:
                print('Nothing interesting could be annotated')
                return None
            
            def get_result(candidates):
                if not candidates: return None
                candidate = candidates.pop(0)
                uri = candidate['@URI']
                return ' '.join(uri.split('/')[-1].split('_'))

            res = {
                'company': get_result(company_candidates),
                'work_place': get_result(place_candidates)
            }

        print(f'Crawler crawled page {url}')
        print(f'Response: {json.dumps(res, indent=4)}')
        return res
