FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install --legacy-peer-deps


CMD ["npm", "test"]
