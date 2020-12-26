FROM node:latest

COPY ./ /home/node/app

WORKDIR /home/node/app

RUN npm install

CMD ["npm", "run", "dev"]