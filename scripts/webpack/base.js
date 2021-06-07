const path = require('path');

const webpackMerge = require('webpack-merge').default;

const cwd = process.cwd();
const SOURCE_PATH = path.join(cwd, 'src');
const isDev = process.env.NODE_ENV !== 'production';
const mode = isDev ? 'development' : 'production';

const baseConfig = {
  mode,
  output: {
    path: path.join(cwd, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'ts-loader',
          //   options: {
          //     experimentalWatchApi: isDev,
          //     transpileOnly: true,
          //   },
          // },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'esnext',
            },
          },
        ],

        include: SOURCE_PATH,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

const merge = (config) => webpackMerge(baseConfig, config);

module.exports = {
  mode,
  merge,
  paths: {
    cwd,
    source: SOURCE_PATH,
  },
  flags: {
    isDev,
  },
};
