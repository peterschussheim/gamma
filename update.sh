#!/bin/bash

# Author: Peter Schussheim
# Purpose: This script is intended to run towards to end of a CI/CD pipeline.

# Image we have a CI process that builds/tests source code, then in another
# step, we initiate a process to build, tag and push docker 'parent' images to
# a registry. Using a hash provided by our CI platform (CIRCLE_SHA1), we can use
# this as a tag for images.

# In an effort to automate as much as possible, and due to limitations of
# the 'zeit now' deployment platform, we need to define a mechanism to
# dynamically inject the CIRCLE_SHA1 variable into a Dockerfile 'template',
# which produces a minimal 'child' image for a given CIRCLE_SHA1 base_image.

# For example, imagine we have the following Dockerfile 'template':
################################################################################
# FROM gammaprod/%%BASE%%:%%TAG%%
# ENV TAG %%TAG%%
################################################################################
# Example (provided by our CI config and env):
################################################################################
# $BASE=web
# $TAG=5b0e8b2
################################################################################
# We want to call this script to update local template Dockerfiles, eg:
################################################################################
# FROM gammaprod/web:5b0e8b2
################################################################################
# Now that we have a 'fresh' Dockerfile with the desired build, we can deploy
# the application normally (as normal os possible) using now-cli using an
# additional job in our CI platform.

# USAGE:
# ./update.sh web ${TAG}
# ./update.sh api ${TAG}

set -Eeuo pipefail

BASE_IMAGE=${1?Error: BASE_IMAGE not given}
TAG=${2-:Error: TAG not given}
IMAGE_VERSION=$BASE_IMAGE:$TAG

# sed '1 /'FROM "$IMAGE_VERSION"'/ i\ w Dockerfile'

echo "FROM gammaprod/$IMAGE_VERSION" >> Dockerfile
echo Done
