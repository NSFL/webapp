var path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
      path: __dirname+'/src/build',
      filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      { 
        test: path.join(__dirname+'/src/build', 'es6'),
        loader: 'babel-loader',
        query: {
          "presets": ["es2015"]
        }
      }
    ]
  }
};
