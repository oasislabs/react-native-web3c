const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

module.exports = {
  target: 'node',
  entry: './webpack_entry.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  externals: {
    'web3-bzz': '{}',
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
                "path" : "path-browserify"
              }
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
      "scrypt": path.resolve(__dirname, "node_modules/scrypt.js")
    }
  },
  plugins: [
    // ignore these plugins completely
    new webpack.IgnorePlugin(/^(?:electron|ws)$/)
  ]
};
