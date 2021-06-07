const path = require('path');
const { flags, merge, paths } = require('./base');
const ElectronReloadPlugin = require('./plugins/electron-reload');

const mainConfig = merge({
  target: 'electron-main',
  entry: {
    preload: path.join(paths.source, 'preload', 'index.ts'),
    main: path.join(paths.source, 'main', 'index.ts'),
  },
  plugins: [
    flags.isDev && new ElectronReloadPlugin(),
  ].filter((v) => v),
  watch: flags.isDev,
});

module.exports = mainConfig;
