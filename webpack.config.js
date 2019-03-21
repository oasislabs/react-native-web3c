const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const babelOptions = JSON.parse(fs.readFileSync('.babelrc'));

module.exports = {
  target: 'node',
  entry: './webpack_entry.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  externals: {
    'web3-bzz': '{}'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: babelOptions,
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
	  "path": path.resolve(__dirname, "node_modules/path-browserify")
	}
  },
  plugins: [
    // ignore these plugins completely
    new webpack.IgnorePlugin(/^(?:electron|ws)$/)
  ]
};
