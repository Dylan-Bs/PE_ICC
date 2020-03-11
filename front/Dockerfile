# base image
FROM node:13.10.1

MAINTAINER Dylan BERSANS "dylan.bersans@eisti.fr"

# Update aptitude with new repo
RUN apt-get update

# Install software 
RUN apt-get install -y git

RUN apk add --update git openssh

RUN addgroup -g 1000 -S git && \
    adduser -u 1000 -S git -G git

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#get the code on the git repo
RUN git clone git@github.com:Dylan-Bs/PE_ICC.git

# set working directory
WORKDIR /PE_ICC/front

# install and cache app dependencies
RUN npm install
RUN npm install -g @angular/cli@8.3.25

# start app
CMD ng serve --host 0.0.0.0