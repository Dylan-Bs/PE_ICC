# base image
FROM node:13.10.1

MAINTAINER Dylan BERSANS "dylan.bersans@eisti.fr"

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# 1. Create the SSH directory.
# 2. Populate the private key file.
# 3. Set the required permissions.
# 4. Add github to our list of known hosts for ssh.
RUN mkdir -p /root/.ssh/ && \
    chmod -R 600 /root/.ssh/ && \
    ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
RUN git clone git@github.com:Dylan-Bs/PE_ICC.git

# set working directory
WORKDIR /PE_ICC/front

# install and cache app dependencies
RUN npm install
RUN npm install -g @angular/cli@8.3.25

# start app
CMD ng serve --host 0.0.0.0