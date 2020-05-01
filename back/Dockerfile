# base image
FROM python:3.8

MAINTAINER Dylan BERSANS "dylan.bersans@eisti.fr"

# set working directory
WORKDIR /PE_ICC/front

COPY . .

# install and cache app dependencies
RUN pip install -r requirements.txt

# start app
CMD python main.py
