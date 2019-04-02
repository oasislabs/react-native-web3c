# react-native-web3c

react-native-web3c is a shim for [web3c.js](https://github.com/oasislabs/web3c.js) to make using web3c in react-native quick and easy.

## Usage

When including web3c.js in a react-native project, make sure to install and link the native randombytes, which is needed for the underlying crypto modules used by web3c.js.

```
yarn add react-native-web3c
yarn add react-native-randombytes
react-native link react-native-randombytes
```

After installing, you can use web3c.js in your react-native app like you would any other library.

If you find the Metro Bundler running out of memory, increase node's memory using the `--max-old-space-size=8192` flag.

## Persisting Key Manager Keys

When instantiating your `web3c` object, be sure to pass in the platform specific persistent storage you'd like to use. An in memory version of this interface is as follows:

```
class Storage {

  constructor() {
    this.db = new Map();
  }

  getItem(key) {
    return this.db.get(key);
  }

  setItem(key, val) {
    this.db.set(key, val);
  }

}
```

Then when instantiating your web3c object, pass it in as part of options.

```
let web3c = new Web3c('https://web3.oasiscloud.io:443', undefined, {
  storage: new Storage()
});
```

## Build

To build a new version of react-native-web3c, run

```
git clone https://github.com/oasislabs/react-native-web3c.git
yarn install
yarn webpack
```

Webpack will output the new index.js as a new version of web3c.js to be used in react-native.
