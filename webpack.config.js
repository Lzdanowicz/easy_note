var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/client.js'
  ],
  output: {
    path: require("path").resolve("./dist"),
    filename: 'bundle.js',
    publicPath: '/'
  }, 
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'react-hmre']
        }
      },
      {
      	test: /\.less$/, 
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "less-loader" // compiles Less to CSS
          }]
      }
    ]
  }
}
