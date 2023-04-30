const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = {
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, './src/index.js'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },

    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
      },
    ),
  ],

  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
};
baseConfig.experiments = {
  topLevelAwait: true,
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  /* eslint-disable global-require */
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
  /* eslint-disable global-require */
  return merge(baseConfig, envConfig);
};
