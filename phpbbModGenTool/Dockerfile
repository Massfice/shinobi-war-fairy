FROM node:latest

COPY ./ /home/node/app

WORKDIR /home/node/app

RUN npm install

USER root

RUN mkdir generated

RUN apt update 
RUN apt upgrade -y
RUN apt -y install lsb-release apt-transport-https ca-certificates
RUN wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
RUN echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/php7.3.list

RUN apt update

RUN apt-get install unzip

RUN unzip forum.zip

RUN unzip gen.zip

RUN apt-get install -y php7.3 php7.3-cli php7.3-common php7.3-curl php7.3-mbstring php7.3-xml

CMD ["npm", "start"]
