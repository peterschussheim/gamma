# gamma

[![CircleCI](https://circleci.com/gh/peterschussheim/gamma.svg?style=svg&circle-token=c2090c289000a9f65ff601f99ca8113ec300b519)](https://circleci.com/gh/peterschussheim/gamma)
- [gamma](#gamma)
  - [Overview](#overview)
    - [Project Goals](#project-goals)
    - [Application Features](#application-features)
    - [Developer Features](#developer-features)
    - [Repo Structure](#repo-structure)
    - [Important Scripts](#important-scripts)
      - [Generate fresh TypeScript types after updating the GraphQL schema:](#generate-fresh-typescript-types-after-updating-the-graphql-schema)
    - [Screenshots](#screenshots)
    - [Known Issues](#known-issues)
    - [Ackowledgements](#ackowledgements)
    - [Notes](#notes)

## Overview

### Project Goals

- [x] Build an alternative UI for working with [GitHub Gists](https://gist.github.com/)
- [x] Great developer experience
- [x] experiment with monorepo structure to understand tradeoffs (blog post coming soon)

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

### Important Scripts

The following are a few scripts in various packages that are useful when developing:

#### Generate fresh TypeScript types after updating the GraphQL schema:

- `yarn workspace web codegen`: Examines the GraphQL service running on port 4000 and generates `schema.json`.
- `yarn workspace web types`: Call this script AFTER `codegen` to generate TypeScript types from the json schema.

### Screenshots

![home](https://github.com/peterschussheim/gamma/blob/master/resources/2020-05-09%2012_38_50-https___gamma.app.png)

![auth](https://github.com/peterschussheim/gamma/blob/master/resources/2020-05-09%2012_39_48-https___gamma.app_auth_login.png)

![authenticated](https://github.com/peterschussheim/gamma/blob/master/resources/2020-05-09%2012_40_07-https___gamma.app.png)

![example1](https://github.com/peterschussheim/gamma/blob/master/resources/2020-05-09%2012_41_57-https___gamma.app_g_754e1e14f3b710dcbafae795f642a6d3.png)

![example1](https://github.com/peterschussheim/gamma/blob/master/resources/2020-05-09%2012_42_18-https___gamma.app_g_754e1e14f3b710dcbafae795f642a6d3.png)

![example1](https://github.com/peterschussheim/gamma/blob/master/resources/2020-05-09%2012_43_15-https___gamma.app_g_7c69d47b17ad50a4c70c3b17b9dc5869.png)

![new_file](https://github.com/peterschussheim/gamma/blob/master/resources/2020-05-09%2012_45_03-https___gamma.app_new.png)

![example1](https://github.com/peterschussheim/gamma/blob/master/resources/2020-05-09%2012_46_56-https___gamma.app_g_2bd83c7ed49ce8b3feefb5b8908c074b.png)

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
