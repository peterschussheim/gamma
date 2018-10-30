# gamma

[![CircleCI](https://circleci.com/gh/peterschussheim/gamma.svg?style=svg&circle-token=c2090c289000a9f65ff601f99ca8113ec300b519)](https://circleci.com/gh/peterschussheim/gamma)
- [gamma](#gamma)
  - [Overview](#overview)
    - [Repo Structure](#repo-structure)
  - [Conventions used in this project](#conventions-used-in-this-project)
    - [`npm` scripts](#npm-scripts)

## Overview

### Repo Structure

`gamma` is structured as a monorepo for convenience and uses `yarn workspaces` to improve developer experience.

## Conventions used in this project

### `npm` scripts

- `start:xxx` starts a **development** server for the package specified after the colon
- `build:xxx` generates a production build for the package specified after the colon


