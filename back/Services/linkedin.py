from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.common.exceptions import TimeoutException

import pickle

class LinkedinCrawler:
    def __init__(self, headless=False):
        opts = webdriver.chrome.options.Options()

        if headless:
            opts.add_argument('--headless')

            # no-sandbox is required to run as ROOT in a container
            opts.add_argument('--no-sandbox')

        self.driver = webdriver.Chrome(options=opts)

    def login(self, username, password):
        self.driver.get('https://www.linkedin.com/')

        login_btn = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((
                By.CSS_SELECTOR,
                '.nav > [data-tracking-control-name="guest_homepage-basic_nav-header-signin"]'
            ))
        )
        (ActionChains(self.driver)
            .pause(0.5)
            .click(login_btn)
        ).perform()

        uname_field = WebDriverWait(self.driver, 5).until(
            EC.element_to_be_clickable((
                By.CSS_SELECTOR,
                'input#username'
            ))
        )
        (ActionChains(self.driver)
            .pause(0.2)
            .click(uname_field)
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

        nav_prof = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((
                By.ID,
                'launchpad-wormhole'
            ))
        )

    def crawl_page(self, url):
        self.driver.get(url)

        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((
                By.CSS_SELECTOR,
                '.profile-background-image'
            ))
        )

        top_xp = self.driver.find_element_by_css_selector(
            '.pv-profile-section__list-item .pv-entity__summary-info'
        )

        title = top_xp.find_element_by_css_selector('h3.t-bold').text
        company = top_xp.find_element_by_css_selector('p.t-normal').text
        date_range = top_xp.find_element_by_css_selector('.pv-entity__date-range :not(.visually-hidden)').text

        return title, company, date_range


if __name__ == '__main__':
    print('`sudo apt install chromium-driver` to use selenium')
    print('Use LinkedinCrawler(headless=True) to hide browser')

    crawler = LinkedinCrawler(headless=False)
    crawler.login('angivare-bot@yahoo.com', 'CODE_COM1')
    ret = crawler.crawl_page('https://www.linkedin.com/in/dylan-bersans/')

    print(ret)

    crawler.driver.quit()
