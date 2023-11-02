FROM node:18-alpine

WORKDIR /counter

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]