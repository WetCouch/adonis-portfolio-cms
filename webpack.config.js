const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
const terser = require('terser');

const extractSass = new MiniCssExtractPlugin({
  filename: 'public/app.css'
});

const copyFiles = new CopyWebpackPlugin([
  {
    from:'resources/assets',
    to:'public'
  }
]);

const minifyJs = new WebpackConcatPlugin({
  bundles: [
    {
      destination: 'public/main.min.js',
      source: 'resources/scripts/**/*.js',
      transforms: {
        after: code => {
          return terser.minify(code).code;
        },
      },
    }
  ]
});


function sassRules () {
  return {
      test: /\.(sass|scss)$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer()]
          }
        },
        'sass-loader'
      ],
    }
}

module.exports = {
  mode: 'development',
  entry: [
    './resources/sass/app.scss'
  ],
  output: {
    filename: 'public/app.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      sassRules()
    ]
  },
  plugins: [
    extractSass,
    copyFiles,
    minifyJs
  ]
};
