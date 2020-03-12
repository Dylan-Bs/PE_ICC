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
    echo "-----BEGIN RSA PRIVATE KEY-----MIIEpAIBAAKCAQEA729O8vGVKe34nBbBuMzyTlauwbEWNf0Ekor7+0TYuCtNf+fPgoa2VSL1sJOY9jZDelO/sbYEBE24XPFPKhU7nwXRSJg2EqAjPZYUbvU5i7JBddUk7KoLTjU/CJKWqWza5uMI49T6IankIYnvP4O0noJS/T4xwMIqQhbzsg9H6ZI9EcwNe/Fd7QDjfqs+Azir92LzeE5YUMRurPU/5pm3KNvRe6OgBNs2dNMl72GtoCvKkculj9l+yqVXnkW1yjJXYFbQ/WTl+4mtBdeU+wGp6oNmCTsKPMxwkEd9IImpk9ocnLK9eXyj885XglExaQ1xGUlzz4IW6RiTmWccLfxGFwIDAQABAoIBAQDgXyhWlXi4sB4290RWTwgJzUU6kR5FPXNZeBCl6GBGRZ38bFiS8nZO1dHyxH2kzDjzmyOZ/v1IoyRPRHpw7zDN1n/GTYzua05a2hcP25Evjb22FCTj+n1ZrqABAo1Y+38uujaMefpkLXZwz3d5x4wstefbFLs+7TT4ddWsWJGFGAsqJdRCLSxU2deE6UiNIH8VUJ4i1JzoSptkVbyD6/I91L+HI2CVqGjWxaJH2PUcwG0xpq/2lG+EHFKA3CSaLfQX9njiz1K5UMiaVqldcgXCRzUs5mzjgr6A7xyuBw/FrQyTiGxycMg10ge9sGhQqtahbo0F8/aqWDG5kzrqJ7qBAoGBAP11LRcajE4iKGPvzTU0IkG/+MvJAThshuEIrWVpeYY91LVwuO/xa+y9hE6vdpflKTBvNQWTNxFSjDVaevfoJzHEWKiIDT8M9HCIRJoS+HpmjVyvQ+jwgVbYIDzIy/QVv/4dL2UNMm4HAB4lsnD9zjCV7GemGUZnrNTKOF9AQuW3AoGBAPHWH92C9hqyZrtfNeHVGBTW5msQyhY99rmBoMM2s82JCDzZQjWWIKcROjYGeN/M8dY+WcJWeIjUFFZscrkwH9AXFY5avzbqTMOo4x+jXiIZp1sCsl5XPb6oO0UOgLeh0E/VTbTETir+Lbdf53t+XfWnw/9c0ZkQa2L2i5Vl1KKhAoGAeZNXSZnGa0QfM7C3MioLtJYs9TM5jqMgH5lV8ysgy6+k9FNZol6fcjOF32hy7nFRzJXLTR1McNazwnPgQEHvawPPsydvkyrXpZL3tSAcaDoA3NCFNpsGr22EKSP4EODN80p0jXhDFFvvRoa2jVRxLwT7HMyjmw3n7ToCyE2+yQkCgYEAgKpfwcbPkVyhc8cwL7rkWRIM/aGtIzBMeF4TXklYWF4z18vvgfsh3EE6K0w+OzQa5tW9g7vl3UaYm3KPhx+njVr6yQZW/ayisubEEC0nBBWKCM3igHcCDtIK1q7kpM6euhrOgQKAZDdfs1R/ICEXdH+Rs+d6TGmD+N8bXJ0VCIECgYAv7KK+YxZyJ0lghz4yrVA7ALmskMVYA9mc7T14sO8+DERDN9LaCfdiHBmyC5RuVw9yEdZzfqkzDyhYpgK8RoOMLGaKva7tUTMKxu9cdoH6KJxG9wxB7JkmuEorNw14zn/OaYi2FXPZRDK8/wW4h2HnxDIOyXfVh34peaHZYtXKGg==-----END RSA PRIVATE KEY-----" > /root/.ssh/id_rsa && \
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