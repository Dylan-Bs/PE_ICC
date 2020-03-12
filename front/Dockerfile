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
    echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC/y8WHE8UAIQLfXi/3nxK0jKTOjZdFbcqnjmLN6PTDSccQKI12LotSfnYvLjB0bnOvzq0gfzYAaGrMIqwGr9o43stOW6nL6GtxgdYC3Q5gzSbkyksLKVhCE/FLlLRnlIgGlVlSwWG95Zo90XVVD//vQFIaFdKYYOMJk8djDDjW5CxXOVIVxuigfUA0k1n+SAU0XJPRcv61MaSOJJlY3Wq1p3IxBtz7NQYOYUs9XXGziKwjJCOY5zCWjDsUy3GU/XQ0mwH4LymKYLmqHOFfQcifRn2AeG8aC8LFPQd6m9XhEj7rLwz89H4H9R0wONjQ21TRKpsOOdP+ivGxBWCAcgQH" > /root/.ssh/id_rsa && \
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