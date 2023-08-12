FROM ubuntu:20.04
RUN apt-get update &&\
apt-get install &&\
DEBIAN_FRONTEND="noninteractive" apt-get -y install tzdata &&\
apt-get install curl wget unzip git software-properties-common mongodb -y &&\
curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh &&\
bash nodesource_setup.sh &&\
apt-get install nodejs -y &&\
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip &&\
unzip ngrok-stable-linux-amd64.zip && mv ngrok /usr/local/bin/ &&\
rm ngrok-stable-linux-amd64.zip && apt-get install default-jdk -y && npm install -g @openapitools/openapi-generator-cli