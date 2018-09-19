# # --- Base Container ---
# FROM mhart/alpine-node:10 AS gamma-api-base
# # Create dir for app
# WORKDIR /usr/src

# # --- Dependencies ---
# FROM gamma-api-base AS dependencies
# COPY package.json ./
# # Install ALL deps (dev & prod)
# RUN yarn --frozen-lockfile --no-cache

# # --- Build Container ---
# FROM dependencies AS gamma-build
# WORKDIR /usr/src
# COPY /packages/api/ /usr/src/packages/api
# # Install build-env dependencies
# RUN yarn --frozen-lockfile --no-cache
# RUN yarn build:api

# # --- Release for production ---
# FROM mhart/alpine-node:10 AS release
# WORKDIR /usr/src
# COPY --from=gamma-build /usr/src/packages/api/ /usr/src/api
# # Install production-only dependencies
# RUN yarn --production

# WORKDIR /usr/src/api
# ENV NODE_ENV="production"
# ENV DEBUG="*,-express:*,-compression*"
# CMD ["node", "-r", "dotenv/config", "dist"]
FROM mhart/alpine-node:10 AS base
LABEL name "api"
WORKDIR /usr/src
COPY . .

RUN yarn
RUN yarn build
RUN yarn --production

# Copy over node_modules and anything else to the smaller base image
FROM mhart/alpine-node:base-10
WORKDIR /usr/src
COPY --from=base /usr/src .
ENV NODE_ENV="production"
ENV DEBUG="*,-express-session*,-body-parser:*,-express:*"

CMD ["node", "-r", "dotenv/config", "dist"]
