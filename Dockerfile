FROM node:10.16.3-alpine

RUN apk add --no-cache build-base gcc autoconf automake libtool zlib-dev libpng-dev nasm
RUN npm install -g gatsby-cli

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
