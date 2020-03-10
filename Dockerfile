FROM python:3.7.4
ENV PYTHONUNBUFFERED 1

RUN mkdir /src
WORKDIR /src
ADD . /src

RUN apt update
# RUN apt install -y chromium chromium-driver
RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN ./manage.py migrate
RUN ./manage.py collectstatic 

CMD python manage.py runserver -b 0.0.0.0:8000

EXPOSE 8000