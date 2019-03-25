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

// Dynamic module loading (e.g., via require.ensure) isn't supported in react-native.
// So ensure Web3 is available in the global namespace so that web3c.js can pick it
// up.
global.Web3 = require('web3');

module.exports = require('web3c');
