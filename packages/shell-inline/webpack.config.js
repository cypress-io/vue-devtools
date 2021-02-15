const path = require('path')
const { createConfig } = require('@vue-devtools/build-tools')

module.exports = createConfig({
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/dist/',
    libraryTarget: 'window',
  },
  devtool: '#cheap-module-source-map'
})
