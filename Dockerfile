# base image
FROM node:18.12.1-alpine

ENV key=value

# create and change to app directory
WORKDIR /usr/app

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 8080

ENV PORT 8080

ENV NEXT_PUBLIC_BASE_URL=http://localhost:8080/api/

CMD ["npm", "start"]