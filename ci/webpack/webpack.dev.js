const Dotenv = require('dotenv-webpack')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const NODE_ENV_VALT = 'development'
process.env.BABEL_ENV = NODE_ENV_VALT
process.env.NODE_ENV = NODE_ENV_VALT

const commonWebpack = require('./webpack.common')
const { join, build, configBase } = require('../paths')

const devSeverOption = {
  historyApiFallback: true,
  contentBase: build,
  open: false,
  compress: true,
  hot: true,
  port: 25791,
  useLocalIp: false,
}

module.exports = merge(commonWebpack, {
  mode: NODE_ENV_VALT,
  devtool: 'inline-source-map',
  devServer: {
    ...devSeverOption,
  },
  module: {
    rules: [
      {
        test: /\.[js]x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: join(configBase, '.env.development'),
      safe: true,
      allowEmptyValues: true,
    }),
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
})
