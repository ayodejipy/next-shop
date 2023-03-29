# base image
FROM node:18.12.1-alpine

# create and change to app directory
WORKDIR /usr/app

COPY . .

RUN npm ci

RUN npm run build

CMD ["npm" "start"]