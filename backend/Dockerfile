FROM node:14
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
CMD ["yarn", "start"]
