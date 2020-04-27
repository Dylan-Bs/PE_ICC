from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.common.exceptions import TimeoutException

class LinkedinCrawler:
    def __init__(self, headless=False):
        opts = webdriver.chrome.options.Options()
        if headless:
            opts.add_argument('--headless')
        self.driver = webdriver.Chrome(options=opts)
        self.wdriver = WebDriverWait(self.driver, 180)

    def login(self, username, password):
        self.driver.get('https://www.linkedin.com/')

        login_btn = self.wdriver.until(
            EC.element_to_be_clickable((
                By.CSS_SELECTOR,
                '.nav > [data-tracking-control-name="guest_homepage-basic_nav-header-signin"]'
            ))
        )
        (ActionChains(self.driver)
            .pause(0.5)
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

    def crawl_page(self, url):
        self.driver.get(url)

        profile_bg = self.wdriver.until(
            EC.presence_of_element_located((
                By.CSS_SELECTOR,
                '.profile-background-image'
            ))
        )

        top_box = self.driver.find_element_by_css_selector(
            '.pv-top-card > .ph5.pb5 > .mt2'
        )

        bg_box = self.driver.find_element_by_id('oc-background-section')

        return {
            'top': top_box.get_attribute('innerHTML'),
            'background': bg_box.get_attribute('innerHTML'),
        }


if __name__ == '__main__':
    print('`sudo apt install chromium-driver` to use selenium')
    print('Use LinkedinCrawler(headless=True) to hide browser')

    crawler = LinkedinCrawler(headless=False)
    crawler.login('angivare-bot@yahoo.com', 'CODE_COM1')
    ret = crawler.crawl_page('https://www.linkedin.com/in/dylan-bersans/')

    print(ret)

    crawler.driver.quit()
