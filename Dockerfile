FROM python:3.7.4
ENV PYTHONUNBUFFERED 1

RUN mkdir /src
WORKDIR /src
ADD . /src

# RUN apt update
# RUN apt install -y chromium chromium-driver
RUN pip install --upgrade pip

RUN pip install -r requirements.txt

ENV DEBUG True        
ENV DATABASE_NAME pe_database
ENV SECRET_KEY 7c6c8696-dd43-469e-a4ee-9a11c6af15d4
ENV DATABASE_USER root
ENV DATABASE_PASSWORD dockerpswd
ENV DATABASE_HOST mongodb
ENV DATABASE_PORT 27017


RUN python ./manage.py collectstatic 

CMD python manage.py runserver 0.0.0.0:8000

EXPOSE 8000