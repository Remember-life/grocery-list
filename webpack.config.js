const path = require('path');
const src_dir = path.join(__dirname, '/client/src');
const dist_dir = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${src_dir}/index.jsx`,
  output: {
    path: dist_dir,
    filename: 'bundle.js'
  },
  mode: 'development',
  watch: true,
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [ '@babel/preset-env', '@babel/preset-react' ]
        }
      }
    }]
  }
}