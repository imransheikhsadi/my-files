const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssPresetEnv = require('postcss-preset-env');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');

module.exports = {
  entry: "./src/script/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  // exclude: /(node_modules|bower_components)/,
  mode: "production",
  devServer: {
    port: 5555,
    open: true
    // writeToDisk: true
  },

  //Shows the source file error line
  // devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },

      {
        test: /\.(png|ttf|woff(2)?|eot|jpeg|gif|jpg|svg)$/i,
        loader: "file-loader",
        options: {
          name: `[path][name].[ext]`,
          context: path.resolve(__dirname, "src/")
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          // 'css-loader?url=false',
          {
            loader:"css-loader",
          },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: (loader) => [
              postcssPresetEnv({
                autoprefixer: { grid: true }
              }),
              new IconfontWebpackPlugin(loader)
            ]
          } },
          "sass-loader"
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          root: "./src/index.html",
          interpolate: true,
          minimize: true,
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "style.css",
      chunkFilename: "[id].css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
