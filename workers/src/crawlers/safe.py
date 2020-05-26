from selenium.common.exceptions import WebDriverException
from traceback import print_exc
from functools import partial

class MaxRetriesError(Exception): pass

def retry(count: int, T_exc: type,
    cb_try: callable, cb_exc: callable,
    error_msg: str, *args, **kwargs
):
    for _ in range(count):
        try:
            return cb_try(*args, **kwargs)
        except T_exc as e:
            print_exc()
            if error_msg != None:
                print(error_msg)

            if cb_exc:
                cb_exc()

    raise MaxRetriesError(error_msg or str(e))

class SafeCrawler:
    def __init__(self,
        T: type, login_args: iter,
        lazy=True, retry_count=3
    ):
        self.T = T
        self.login_args = login_args
        self.retry_count = retry_count

        self.instance = None
        self.logged = False

        if not lazy:
            self._instance_init()

    def _retry(self, cb_try: callable, cb_exc: callable, msg: str, *args, **kwargs):
        return retry(self.retry_count, WebDriverException,
            cb_try, cb_exc,
            msg, *args, **kwargs
        )

    def _instance_create(self):
        try:
            self.instance.webdriver.quit()
        except:
            pass

        self.instance = self.T()
    
    def _instance_login(self):
        self.instance.login(*self.login_args)

    def _instance_init(self):
        self._instance_create()

        self._retry(
            self._instance_login,
            self._instance_create,
            'Reloading crawler instance... (crash during login)'
        )

    def __getattr__(self, name):
        attr = getattr(self.instance, name)
        if not callable(attr):
            return attr

        return partial(self._retry,
            attr,
            self._instance_init,
            'Reloading crawler instance...'
        )
