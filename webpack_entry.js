require('node-libs-react-native/globals');

// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer;
global.process = require('process');

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}

const web3bzz = require('./web3-bzz');
const bSign = require('browserify-sign');
const ethlib = require('eth-lib');
const crypto = require('react-native-crypto');
const stream = require('stream-browserify');
const Web3 = require('web3');
global.Web3 = Web3;
module.exports = require('web3c');
