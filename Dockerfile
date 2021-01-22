FROM node:alpine
WORKDIR /usr/ts-docker
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 7777
ENV DB_PORT=5432 
ENV POSTGRES_USER: postgres
ENV POSTGRES_PASSWORD: postgres
ENV POSTGRES_DB: popina
RUN yarn run build
CMD ["node", "./dist/index.js"]
