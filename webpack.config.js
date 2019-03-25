const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

module.exports = {
  optimization: {
    minimize: false,
    namedModules: true
  },
  target: 'node',
  entry: './webpack_entry.js',
  output: {
    path: __dirname,
    library: 'Web3c',
    libraryTarget: 'commonjs2',
    filename: 'index.js'
  },
  externals: {
    'react-native': 'react-native'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            "react-native",
            "module:metro-react-native-babel-preset"
          ],
          plugins: [
            ["babel-plugin-rewrite-require", {
              "aliases": {
                "crypto": "react-native-crypto",
                "randombytes": "react-native-randombytes",
                "path": "path-browserify",
                "http": "@tradle/react-native-http",
                "https": "https-browserify",
                "stream": "stream-browserify",
                "vm": "vm-browserify",
                "tty": "tty-browserify",
                "fs": "react-native-level-fs",
                "net": "react-native-tcp",
                "os": "react-native-os",
                "eth-lib": "oasis-eth-lib",
                "zlib": "browserify-zlib",
                "_stream_transform": "readable-stream/transform",
                "_stream_readable": "readable-stream/readable",
                "_stream_writable": "readable-stream/writable",
                "_stream_duplex": "readable-stream/duplex",
                "_stream_passthrough": "readable-stream/passthrough",
              },
              "throwForNonStringLiteral": true
            }]
          ]
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      "scrypt": path.resolve(__dirname, "node_modules/scrypt.js"),
      'web3-bzz': path.resolve(__dirname, 'web3-bzz')
    }
  },
  plugins: [
    new webpack.IgnorePlugin(/^(?:electron|ws)$/)
  ]
};
