FROM ubuntu:latest
FROM node:16.14.2 AS build

COPY . .
RUN npm install && npm run build

FROM node:slim-16.14.2
USER node

COPY --from=build /home/node/app/dist /home/node/app/package.json /home/node/app/package-lock.json ./
RUN npm install --production

CMD ["node", "dist/index.js"]