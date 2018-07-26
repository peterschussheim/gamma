FROM mhart/alpine-node:10
# set /usr/src to store all files needed to complete build step
WORKDIR /usr/src
# We first add only the files required for installing deps
# If package.json or yarn.lock don't change, no need to re-install later
COPY yarn.lock package.json ./
# install deps
RUN yarn
# copy all source files
COPY . .
# execute yarn build script and move the resulting '/build' artifact to '/public'
RUN yarn build && mv build /public
