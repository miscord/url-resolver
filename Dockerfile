FROM node:alpine

WORKDIR /app

COPY package*.json ./

EXPOSE 8833

RUN npm install
COPY . .

CMD [ "node", "index" ]
