const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractSass = new MiniCssExtractPlugin({
  filename: 'public/app.css'
});

function sassRules () {
  return [
    {
      test: /\.(sass|scss)$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ],
    }
  ]
}

module.exports = {
  mode: 'development',
  entry: [
    './resources/assets/sass/app.scss'
  ],
  output: {
    filename: 'public/app.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: sassRules()
  },
  plugins: [
    extractSass
  ]
};
