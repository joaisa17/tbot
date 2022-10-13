FROM ubuntu:latest
FROM node:16-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY .env /app
COPY dist /app

RUN npm i --omit=dev
CMD ["npm", "start"]
