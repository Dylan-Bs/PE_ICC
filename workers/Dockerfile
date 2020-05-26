FROM python:3.7.4

WORKDIR /root
ENV PYTHONPATH /root/src

RUN apt update &&\
    apt install -y chromium chromium-driver &&\
    pip install --upgrade pip

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

ENTRYPOINT [ "python", "-u", "src/launch.py" ]
