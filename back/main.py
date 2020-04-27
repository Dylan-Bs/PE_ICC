from api import app

import routes.account

if __name__ == '__main__':
    @app.route('/')
    def index():
        return "Hello"

    app.run(debug=True)
