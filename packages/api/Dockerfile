FROM mhart/alpine-node:10 as base
LABEL name "gamma-api-prod"
WORKDIR /usr/src
COPY . .

RUN yarn
RUN yarn build
RUN yarn --production

# Copy over node_modules and anything else to the smaller base image
FROM mhart/alpine-node:base-10
WORKDIR /usr/src
ENV NODE_ENV="production"
ENV DEBUG="*,-express-session*,-body-parser:*,-express:*"
COPY --from=base /usr/src .

EXPOSE 4000
CMD ["node", "-r", "dotenv/config", "dist"]

