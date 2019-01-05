const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer');

const isDev = env => env === 'development';

module.exports = (env = process.env.NODE_ENV || 'production') => ({
  entry: {
    index: './src/index.js',
  },
  performance: {
    hints: false,
  },
  mode: env,
  optimization: {
    minimize: false,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebookincubator/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
          },
          mangle: false,
          output: {
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebookincubator/create-react-app/issues/2488
            ascii_only: true,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Click Copy Code',
      filename: 'index.html',
      template: './src/index.ejs',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }]
    },
    {
      test: /\.css$/,
      include: (modulePath) => {
        return !modulePath.includes('node_modules');
      },
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]',
            camelCase: 'dashes',
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => autoprefixer({
              browsers: ['last 3 versions', '> 1%'],
              grid: true
            })
          }
        },
      ],
    },
    {
      // Disable CSS Modules for all vendor less imports and override files
      test: /\.(css|less)$/,
      include: (modulePath) => {
        return modulePath.includes('node_modules');
      },
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            javascriptEnabled: true,
          },
        },
      ],
    },
    ],
  },
  devtool: env === 'development' ? 'source-map' : 'none',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
});
