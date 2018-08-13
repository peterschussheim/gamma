# gamma

## Overview

Reference application demonstrating best practices with a few opinions thrown into the mix.

### Repo Structure

`gamma` is structured as a monorepo for convenience and is organized as follows:

```
project
├── package.json
├── services
│   ├── package.json
│   └── index.js
└── react-app
|   ├── package.json
|   └── index.js
├── style-guide
│   ├── package.json
│   └── index.js
```


## Conventions used in this project

### `npm` scripts

- `start:xxx` starts a **development** server for the package specified after the colon
- `build:xxx` generates a production build for the package specified after the colon
- `test` uses `lerna` to run tests in any package with a `tests` script

## services aliases

![](docs/path-aliases.png)
