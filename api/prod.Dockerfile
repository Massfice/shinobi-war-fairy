FROM node:latest

COPY ./ /home/node/app

WORKDIR /home/node/app

RUN npm install --only=prod

CMD ["npm", "start"]
