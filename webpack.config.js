const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: './webpack_entry.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ["module:metro-react-native-babel-preset"]
        },
		exclude: path.resolve(__dirname, 'node_modules')
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
