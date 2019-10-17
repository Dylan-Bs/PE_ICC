FROM openjdk:8-stretch

RUN apt-get update
RUN apt-get install -y apt-transport-https

RUN echo "deb https://dl.bintray.com/sbt/debian /" | tee -a /etc/apt/sources.list.d/sbt.list
RUN curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | apt-key add

RUN apt-get update
RUN apt-get install -y sbt

WORKDIR /root
COPY . .

RUN sbt compile
CMD sbt run
