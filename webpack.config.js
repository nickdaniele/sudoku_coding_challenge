const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    __dirname + '/src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
    publicPath: '/assets',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      { 
        test: /\.css$/, 
        exclude: /\.useable\.css$/, 
        loader: "style!css" },
      { 
        test: /\.useable\.css$/, 
        loader: "style/useable!css" }
    ],
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Custom template',
        template: __dirname + '/src/index.html'
      })
    ]
  },
};
