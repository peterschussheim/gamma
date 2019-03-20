# gamma

[![CircleCI](https://circleci.com/gh/peterschussheim/gamma.svg?style=svg&circle-token=c2090c289000a9f65ff601f99ca8113ec300b519)](https://circleci.com/gh/peterschussheim/gamma)
- [gamma](#gamma)
  - [Overview](#overview)
    - [Project Goals](#project-goals)
    - [Application Features](#application-features)
    - [Developer Features](#developer-features)
    - [Repo Structure](#repo-structure)
    - [Architecture](#architecture)
    - [Screenshots](#screenshots)
    - [Known Issues](#known-issues)
    - [Ackowledgements](#ackowledgements)
    - [Notes](#notes)

## Overview

### Project Goals

- [ ] Build an alternative UI for working with [GitHub Gists](https://gist.github.com/)
- [ ] Great developer experience
- [ ] experiment with monorepo structure to understand tradeoffs (blog post coming soon)

### Application Features

- View, edit and create gists
- Leverages the fantastic [monaco-editor](https://github.com/Microsoft/monaco-editor) library for:
  - IntelliSense
  - familar keyboard shortcuts (similar to VSCode)
  - highly extensible

### Developer Features

- automatic preview deployments for pull requests
- minimal set of Cypress e2e tests
- CI & CD workflows using CircleCI, GitHub and DockerHub

### Repo Structure

`gamma` is structured as a monorepo for convenience and uses `yarn workspaces` to improve developer experience.

Important directories:

- `packages/api`: Source code for the application server and GraphQL data layer
- `packages/web`: Source code for the React UI and rendering service
- `packages/gamma-core`: A fork of the project [razzle](https://github.com/jaredpalmer/razzle)
- `packages/babel-preset-gamma`: Babel preset used with `gamma-core` package for building `web`
- `packages/shared`: Contains shared code that can be used across packages.
  
CI/CD Scripts for use with CircleCI:

- `deploy-pr.sh`: Bash script used to automatically create preview deployments for pull requests
- `sendurl.sh`: Bash script which posts preview deployment metadata to a GitHub app
- `update.sh`: Bash script to dynamically inject an environment variable into a Dockerfile 'template'

### Architecture

coming soon

### Screenshots

coming soon
### Known Issues

Due to time constraints and project goals, there are a number of known issues and known limitations
with regard to functionality/features.

- [ ] View/edit own gists
  - [ ] search, starring, commenting, custom pagination not yet supported
- [ ] 'public' is the default setting for new gists
- [ ] indication of gist public/private status not implemented
- [ ] Front-end authentication mechanism breaks current user session on refresh
- [ ] Typings and lint workers currently disabled

### Ackowledgements

- [razzle](https://github.com/jaredpalmer/razzle)
- [snack-web](https://github.com/expo/snack-web)
- [CodeSandbox](https://github.com/CompuIves/codesandbox-client)

### Notes

Below are links to various documents created during development that may be useful to others.  Please note that these documents were created for personal use and are unfinished/unedited.

- [CI-CD](docs/ci-cd.md)
- [codegen](docs/codegen.md)
- [consuming types question for stack overflow](docs/consuming-types-so-question.md)
- [monaco notes](docs/monaco.md)
- [monorepo notes](docs/monorepo.md)
