FROM node:alpine
WORKDIR /usr/ts-docker
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 7777
ENV DB_PORT=5432 
RUN yarn run build
CMD ["node", "./dist/index.js"]
