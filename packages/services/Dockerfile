FROM mhart/alpine-node:10
LABEL name "gamma-api-prod"
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production

# Copy over node_modules and anything else to the smaller base image
FROM mhart/alpine-node:10
WORKDIR /app
COPY --from=0 /app .
COPY . .

ARG DEBUG
ENV DEBUG ${DEBUG:-*,-body-parser:*,-express:*,-snapdragon:*
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production
EXPOSE 4000

CMD ["node", "-r", "now-env", "./dist/index.js"]
