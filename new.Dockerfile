# --- Base Container ---
# Contains all sources for project
FROM mhart/alpine-node:10 AS gamma-base
# Create dir for app
WORKDIR /usr/src/app
# copy root package.json to ensure workspaces function
COPY . /usr/src/app
# Install ALL deps (dev & prod)
RUN yarn install --prod --offline && \ 
  rm -rf .yarn_mirror && \
  mv node_modules /tmp

# --- Build Container ---
FROM gamma-base AS gamma-build
WORKDIR /usr/src

COPY /packages/shared/ /usr/src/packages/shared
COPY /packages/babel-preset-gamma/ /usr/src/packages/babel-preset-gamma
COPY /packages/gamma-core/ /usr/src/packages/gamma-core
COPY /packages/web/ /usr/src/packages/web
# Install build-env dependencies
RUN apk add --no-cache make gcc g++ python
RUN yarn --frozen-lockfile --no-cache
RUN yarn build:web

# --- Release for production ---
FROM mhart/alpine-node:10 AS release
WORKDIR /usr/src
COPY --from=gamma-build /usr/src/packages/web/ /usr/src/packages/web
COPY --from=gamma-build /usr/src/packages/shared/ /usr/src/packages/shared
COPY --from=gamma-build /usr/src/packages/babel-preset-gamma/ /usr/src/packages/babel-preset-gamma
COPY package.json ./
# Install production-only dependencies
RUN apk add --no-cache make gcc g++ python
RUN yarn --production
# COPY --from=gamma-build /usr/src/packages/web ./
# WORKDIR /usr/src/web
ENV NODE_ENV="production"
ENV DEBUG="*,-babel*,-eslint*,-express:*,-compression*"
EXPOSE 3000
CMD ["node", "-r", "dotenv/config", "packages/web/build/server.js", "dotenv_config_path=packages/web/.env"]
