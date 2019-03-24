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
	'react-native': 'react-native',
	'web3-bzz': 'web3-bzz'
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
				"os": "react-native-os"
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
	  "crypto": path.resolve(__dirname, "node_modules/react-native-crypto"),
	  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
	  'web3-bzz': path.resolve(__dirname, 'node_modules/web3-eth'),
	  'eth-lib': path.resolve(__dirname, 'node_modules/eth-lib'),
	  'react-native-crypto': path.resolve(__dirname, 'node_modules/react-native-crypto'),
    }
  },
  plugins: [
    // ignore these plugins completely
    new webpack.IgnorePlugin(/^(?:electron|ws)$/)
  ]
};
