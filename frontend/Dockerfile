FROM node:14-alpine

WORKDIR /app

COPY frontend/package*.json ./

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]