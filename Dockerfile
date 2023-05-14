FROM node:14
WORKDIR /app
COPY . .
COPY my-docker-ui /app/public
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]