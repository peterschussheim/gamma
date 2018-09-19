# --- web ---
# --- Base Container ---
FROM mhart/alpine-node:10 AS base
# Create dir for app
WORKDIR /usr/src/app
# Copy all sources except `packages/api` (seperate dockerfile)
COPY . ./
RUN ls -ag ./

# --- Build Container ---
FROM base AS build-container
# COPY . .
# Install deps
RUN apk add --no-cache make gcc g++ python
RUN yarn --frozen-lockfile --no-cache
RUN yarn build:web
# copy src with build to root
# COPY /usr/src/app

# --- Production dependencies ---
# FROM build-container AS gamma-build
# WORKDIR /usr/src
# COPY /packages/shared/ /usr/src/packages/shared
# COPY /packages/babel-preset-gamma/ /usr/src/packages/babel-preset-gamma
# COPY /packages/gamma-core/ /usr/src/packages/gamma-core
# COPY /packages/web/ /usr/src/packages/web
# # Install build-env dependencies
# # RUN apk add --no-cache make gcc g++ python
# # RUN yarn --frozen-lockfile --no-cache --production
# RUN yarn build:web

# --- Release for production ---
FROM mhart/alpine-node:10 AS release
WORKDIR /usr/src/app
COPY --from=build-container /usr/src/app/package.json ./
COPY --from=build-container /usr/src/app/packages/web/ packages/web/
COPY --from=build-container /usr/src/app/packages/shared/ packages/shared/
COPY --from=build-container /usr/src/app/packages/babel-preset-gamma/ packages/babel-preset-gamma/
# Install production-only dependencies
RUN apk add --no-cache make gcc g++ python
RUN yarn --frozen-lockfile --no-cache --production 
ENV NODE_ENV="production"
ENV DEBUG="*,-babel*,-eslint*,-express:*,-compression*"
EXPOSE 3000
CMD ["node", "-r", "dotenv/config", "packages/web/build/server.js"]
