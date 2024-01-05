const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, './src/ts/main.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      // {
      //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //     use: [{
      //         loader: 'file-loader',
      //         options: {
      //             outputPath: 'img',
      //             publicPath: 'img',
      //             name: '[name].[ext]',
      //         }
      //     }, ],
      // }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'img/[hash][ext]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: path.resolve(__dirname, './dist'),
        },
      ],
    }),
    new ESLintPlugin({ extensions: ['ts', 'js'] }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
