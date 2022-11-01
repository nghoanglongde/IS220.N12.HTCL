FROM node:14-alpine

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install 
RUN npm install --save normalize.css
RUN npm i react-router-dom
RUN npm i classnames
RUN npm i styled-components


COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
