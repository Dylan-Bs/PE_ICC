# base image
FROM node:13.10.1

MAINTAINER Dylan BERSANS "dylan.bersans@eisti.fr"

# copy the repository form the previous image
# COPY --from=intermediate /PE_ICC /PE_ICC

# set working directory
WORKDIR /PE_ICC/front

# add `/app/node_modules/.bin` to $PATH
ENV PATH /PE_ICC/front/node_modules/.bin:$PATH

COPY package.json /PE_ICC/front/package.json

# install and cache app dependencies
RUN npm install
RUN npm install -g @angular/cli@8.3.25

COPY ./ /PE_ICC/front

# start app
CMD ng serve --host 0.0.0.0 --disable-host-check --prod=true