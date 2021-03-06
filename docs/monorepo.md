# monorepo tips

- [monorepo tips](#monorepo-tips)
  - [Workflows](#workflows)
    - [Initial Dependency Installation](#initial-dependency-installation)
    - [Build all packages within repo](#build-all-packages-within-repo)
    - [Run tests across all repo packages](#run-tests-across-all-repo-packages)
    - [Modifying a package's dependencies](#modifying-a-packages-dependencies)
    - [Clear local caches](#clear-local-caches)
  - [`yarn workspaces` `nohoist` option](#yarn-workspaces-nohoist-option)
  - [`lerna`](#lerna)
    - [Root `package.json`](#root-packagejson)

## Workflows
Unless otherwise noted, all commands are expected to be issued from project root.

### Initial Dependency Installation
- `yarn`

### Build all packages within repo
- `yarn build`

`yarn build` calls `lerna build` which will inspect each package and if a `build` script exists in it's `package.json`, execute the defined build script.

### Run tests across all repo packages
- `yarn test`

### Modifying a package's dependencies

- `yarn workspace <workspace_name> <command>`

Example:

`yarn workspace ssr add express`
`yarn workspace ssr remove eslint --dev`

### Clear local caches
This command is useful when you have issues with dependecies.

- `yarn reset`

Executing this command will:
1. remove root `node_modules`, `yarn.lock` and the `node_modules` directory of each package
2. `yarn cache clean`


## `yarn workspaces` `nohoist` option

The following snippet is from the excellent example repo [yarn-nohoist] demonstrating common scenarios, their problems and solutions to fix them.


Below is the yarn workspaces configure from the package.json under the **project's root directory**.

```
"workspaces": {
  "packages": ["packages/*"],     
  "nohoist": [
    "**/react-native",            // --- 1
    "**/react-native/**",         // --- 2
    "react-cipher/react-scripts", // --- 3
    "**/cipher-core",             // --- 4
    "RNCipher/react-native-*",    // --- 5
    "RNCipher/react-native-*/**", // --- 6
    "RNCipher/vm-browserify",     // --- 7
    "RNCipher/vm-browserify/**"   // --- 8
  ]
},
```

1. this tells yarn not to hoist react-native module for any workspace package referencing it. This is mainly for react-native app, we could also replace the wildcard "**" with explicit package name like RNCipher.
2. this tells yarn not to hoist any of the react-native's dependent modules. This is for RNCipher.
3. this tells yarn not to hoist react-scripts under workspace react-cipher. This is to bypass create-react-app problem under monorepo project as of today (1/31/2018).
4. this tells yarn not to hoist cipher-core for any workspace referencing it. Both react-ciper and RNCipher depends on cipher-core. yarn will create a symlink to the actual cipher-core under each package's node_modules.
5. (lines 5-8)these tell yarn not to hoist any module and their dependencies with name "vm-borwserify" or prefixed with "react-native-" under RNCipher workspace. These modules are react-native adapted node modules, which will be bundled by react-native's bundler metro.


## `lerna`

`lerna` is a tool that helps manage multi-package repositories.  It is different from `yarn workspaces` in that `lerna` is focused on linking together packages and running common tasks across all or a select set of packages.

### Root `package.json`

This manages `devDependencies` and repo-wide scripts.  For example, we can define the following script in our root `package.json`:

```json
{
  "scripts": {
    "build": "lerna run build"
  }
}
```

Executing this script will instruct `lerna` to inspect all packages under our `lerna.json` config, and if a `build` script exists in each package, run it.

[yarn-nohoist]: https://github.com/connectdotz/yarn-nohoist-examples.git
[babel-monorepo-design-docs]: https://github.com/babel/babel/blob/master/doc/design/monorepo.md
[Why we dropped Lerna from PouchDB]: https://gist.github.com/nolanlawson/457cdb309c9ec5b39f0d420266a9faa4
[alle]: https://github.com/boennemann/alle
