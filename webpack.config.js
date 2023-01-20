const path = require('path');
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.TARGET,
  entry: path.resolve('./frontend/index.jsx'),

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/i,
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  devServer: {
    port: 8080,
    static: { directory: './dist' },
    watchFiles: {
      paths: ['./frontend/**/*'],
    },
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./frontend/index.html'),
    }),
  ],

  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
  },
};
