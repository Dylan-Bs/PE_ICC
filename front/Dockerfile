# base image
FROM node:13.10.1

MAINTAINER Dylan BERSANS "dylan.bersans@eisti.fr"

# copy the repository form the previous image
# COPY --from=intermediate /PE_ICC /PE_ICC

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# 1. Create the SSH directory.
# 2. Populate the private key file.
# 3. Set the required permissions.
# 4. Add github to our list of known hosts for ssh.
RUN mkdir -p /root/.ssh/ && \
    echo "-----BEGIN OPENSSH PRIVATE KEY-----" > /root/.ssh/id_rsa && \
    echo "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\
    jI0eocsFV60EkrAAAACmR5bGFuQGFyY2g=" >> /root/.ssh/id_rsa && \
    echo "-----END OPENSSH PRIVATE KEY-----" >> /root/.ssh/id_rsa && \
    chmod -R 600 /root/.ssh/ && \
    touch /root/.ssh/known_hosts && \
    ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts && \
    git clone git@github.com:Dylan-Bs/PE_ICC.git

# set working directory
WORKDIR /PE_ICC/front

# install and cache app dependencies
RUN npm install
RUN npm install -g @angular/cli@8.3.25

# start app
CMD ng serve --host 0.0.0.0 --disable-host-check
