FROM python:3.7.4
ENV PYTHONUNBUFFERED 1

RUN mkdir /src
WORKDIR /src
ADD . /src

RUN pip install --upgrade pip

RUN apt update &&\
    apt install -y chromium chromium-driver

RUN pip install -r requirements.txt

ENV DEBUG False        
ENV SECRET_KEY 7c6c8696-dd43-469e-a4ee-9a11c6af15d4
ENV DATABASE_NAME pe_database
ENV DATABASE_USER admin
ENV DATABASE_PASSWORD dockerpswd
ENV DATABASE_HOST mongo
ENV DATABASE_PORT 27017


RUN python ./manage.py collectstatic 

CMD python manage.py runserver 0.0.0.0:8000

EXPOSE 8000
