# --- Base Container ---
FROM mhart/alpine-node:10 AS gamma-base
# Create dir for app
WORKDIR /usr/src

# --- Dependencies ---
FROM gamma-base AS dependencies
COPY package.json ./
# Install ALL deps (dev & prod)
RUN yarn --frozen-lockfile --no-cache

# --- Build Container ---
FROM dependencies AS gamma-build
WORKDIR /usr/src
COPY /packages/shared/ /usr/src/packages/shared
COPY /packages/babel-preset-gamma/ /usr/src/packages/babel-preset-gamma
COPY /packages/gamma-core/ /usr/src/packages/gamma-core
COPY /packages/web/ /usr/src/packages/web
# Install build-env dependencies
RUN apk add --no-cache make gcc g++ python
RUN yarn --frozen-lockfile --no-cache --production
RUN yarn build:web

# --- Release for production ---
FROM mhart/alpine-node:10 AS release
WORKDIR /usr/src
COPY --from=gamma-build /usr/src/packages/web/ /usr/src/web
COPY --from=gamma-build /usr/src/packages/shared/ /usr/src/shared
COPY --from=gamma-build /usr/src/packages/babel-preset-gamma/ /usr/src/babel-preset-gamma
# Install production-only dependencies
RUN yarn --production
# COPY --from=gamma-build /usr/src/packages/web ./
WORKDIR /usr/src/web
ENV NODE_ENV="production"
ENV DEBUG="*,-babel*,-eslint*,-express:*,-compression*"
EXPOSE 3000
CMD ["node", "-r", "dotenv/config", "build/server.js"]
