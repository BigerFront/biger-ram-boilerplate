const path = require('path')

module.exports = {
  R: (...p) => path.resolve(...p),
  join: (...p) => path.join(...p),
  favicon: path.resolve(__dirname, '../src/assets/icons/logo.png'),
  configBase: path.resolve(__dirname, '../config'),
  src: path.resolve(__dirname, '../src'),
  pub: path.resolve(__dirname, '../public'),
  build: path.resolve(__dirname, '../dist'),
}
