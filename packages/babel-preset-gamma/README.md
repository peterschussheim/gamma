# babel-preset-gamma

This package includes the [Babel](https://babeljs.io) preset used by [gamma](https://github.com/peterschussheim/gamma)

## Usage in gamma Projects

The easiest way to use this configuration is with gamma, which includes it by default. **You don’t need to install it separately in gamma projects.**

## Usage Outside of gamma

If you want to use this Babel preset in a project not built with gamma, you can install it with following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then create a file named `.babelrc` with following contents in the root folder of your project:

  ```js
  {
    "presets": ["gamma"]
  }
  ```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/), which assumes that `Object.assign` is available or polyfilled.
