const path = require('path');

module.exports = {
    entry:"./express.js",
    mode: 'production',
    output: {
        path:path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', 
    },
    resolve: {
        // extensions: ['', '.js'],
        // root: path.join(__dirname, './node_modules/express')
        alias: {
            Utilities: path.resolve(__dirname, './node_modules/express'),
          },
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: [/node_modules/],
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
};