const path = require('path')
const { createConfig } = require('@vue-devtools/build-tools')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    'vue-app': './vue-app.js',
    'parent-app': './parent-app.js'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                require.resolve('@vue-devtools/app-frontend/src/style/imports.styl')
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|woff2)$/,
        loader: 'url-loader?limit=0'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: `Vue App`,
      template: 'vue-app.html',
      inject: false,
      filename: 'vue-app.html'
    }),
    new HtmlWebpackPlugin({
      title: `Parent App`,
      template: 'parent-app.html',
      inject: false,
      filename: 'index.html'
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  devtool: '#cheap-module-source-map',
}
