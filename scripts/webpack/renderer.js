const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { flags, merge, paths } = require('./base');

const rendererConfig = merge({
  target: 'web',
  entry: {
    renderer: path.join(paths.source, 'renderer', 'index.ts'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'app',
      template: path.join(paths.source, 'renderer', 'public', 'index.html'),
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.ids.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],
  devServer: (
    flags.isDev ? {
      contentBase: path.join(paths.cwd, 'build'),
      port: 3000,
      hot: true,
    } : undefined
  ),
});

module.exports = rendererConfig;
