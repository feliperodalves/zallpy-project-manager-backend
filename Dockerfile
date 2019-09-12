FROM node:12.10.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn

EXPOSE 3333

CMD ["yarn", "dev"]
