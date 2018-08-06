# monorepo tips

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

[yarn-nohoist]:[https://github.com/connectdotz/yarn-nohoist-examples.git]
