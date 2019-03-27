# react-native-web3c

react-native-web3c is a shim for [web3c.js](https://github.com/oasislabs/web3c.js) to make using web3c in react-native quick and easy.

## Usage

When including web3c.js in a react-native project, make sure to install and link the native randombytes, which is needed for the underlying crypto modules used by web3c.js.

```
yarn install react-native-web3c
yarn install react-native-randombytes
react-native link react-native-randombytes
```

After installing, you can use web3c.js in your react-native app like you would any other library.

## Build

To build a new version of react-native-web3c, run

```
git clone https://github.com/oasislabs/react-native-web3c.git
yarn install
yarn webpack
```

Webpack will output the new index.js as a new version of web3c.js to be used in react-native.
