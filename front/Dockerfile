# base image
FROM node:14.2

MAINTAINER Dylan BERSANS "dylan.bersans@eisti.fr"

# copy the repository form the previous image
# COPY --from=intermediate /PE_ICC /PE_ICC

RUN mkdir -p /app
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json /app/

# install and cache app dependencies
RUN npm install

RUN npm install -g @angular/cli@8.3.25

COPY ./ /app

EXPOSE 4200

# start app
CMD ng serve --host 0.0.0.0 --disable-host-check --prod=true