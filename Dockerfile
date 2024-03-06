FROM node:18-alpine

WORKDIR /usr/src/api

COPY package*.json ./
COPY .env.production .env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]