## Steps to follow on Twilio

1. Sign Up on Twilio and purchase a number.
2. Add 'Pakistan' or your country to "low risk countries".
3. Create a service and then a function named "/handle_call" in twilio.
4. Copy and paste the code present in the twilio_code/handle_call.js, twilio_code/error.js, and twilio_code/end_message.js into your functions on twilio.
5. Replace <your_ngrok_url_here> with your ngrok url.
6. Replace <your_verified_number_here> with your verified number.
7. Replace <your_twilo_function_url_without_route> with your twilio function url but without the route.
8. In server.js file, you need to provide your MONGODB_URL and TWILIO_BASE_URL to make things work.
6. Enjoy :D

## Installation

I have used docker for running my node.js application. Here is the Dockerfile:

```
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
```
I have also added the Dockerfile in the project.

## Technologies used
* Node.js
* Docker
* MongoDB
* Express.js
* OpenAPI
* Twilio
* Heroku

## Running Ngrok and the node application

To run ngrok and the node application, you can follow the following instructions:

```
 cd <directory_to_Dockerfile>
 docker build -t <image_name> . 
 docker run -v $(pwd):/home -p 8080:8080 -it <image_name>
 cd /home
 ngrok authtoken 'Your_ngrok_auth_token'
 ngrok http 8080
 # Exec into the running container using the following command:
 docker exec -it <running_container_id> /bin/bash 
 cd /home/
 openapi-generator-cli generate -i openapi.yaml -g html -o call-api-documentation
 service mongodb start
 npm install
 npm start
```

If you have any question. Please feel me free to contact me at abdullah.arshad.314@gmail.com
