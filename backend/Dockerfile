FROM node:14-alpine
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production
COPY . .
CMD ["node", "src/app.js"]
