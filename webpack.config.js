const path = require('path');
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.TARGET,
  entry: path.resolve('./frontend/index.js'),

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },

  devServer: {
    port: 8080,
    static: { directory: './dist' },
    watchFiles: {
      paths: ['./frontend/**/*'],
    },
    // proxy: {
    //   "/api": "http://localhost:3000",
    // },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./frontend/index.html'),
    }),
  ],

  output: {
    path: path.resolve('./frontend/dist'),
    filename: 'bundle.js',
  },
};
