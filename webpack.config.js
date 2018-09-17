const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    path.resolve('src', 'index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dest/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
        },
      },
      {
        test: /\.(jpg|png|json|svg)$/,
        loaders: 'url-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js','json','jsx',".vue"],
  },
  devServer: {
    contentBase: 'public',
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
  }
};
