FROM node:alpine
MAINTAINER rhyuen
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
EXPOSE 9090 1990
RUN addgroup -S newestgroup && adduser -S -g newestgroup newestuser
RUN chown newestuser -R /node_modules
USER newestuser
CMD ["npm", "start"]