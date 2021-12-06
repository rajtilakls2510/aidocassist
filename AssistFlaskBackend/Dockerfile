FROM ubuntu:20.10
RUN apt-get update && apt-get install -y python3 python3-pip
WORKDIR app
RUN pip3 install --upgrade pip setuptools wheel
COPY ./requirements.txt ./
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8000

CMD gunicorn --bind 0.0.0.0:8000 Application:application