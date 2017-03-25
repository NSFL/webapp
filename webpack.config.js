var path = require('path');
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname),
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { 
              test: path.join(__dirname ),
              loader: 'babel-loader',
              query: {
                "presets": ["es2015"]
              },
            }
        ]
    }
};