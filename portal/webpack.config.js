const path = require("path");
const webpack = require("webpack");
const HTMLWebpachPlugin = require("html-webpack-plugin");
// const ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/portal.js"
  },
  output: {
    publicPath: "",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader"
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/
      }
    ]
  },

  node: {
    fs: "empty"
  },
  resolve: {
    modules: [__dirname, "node_modules"]
  },
  plugins: [
    new HTMLWebpachPlugin({
      title: "micro-frontend",
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/index.html"),
        from: path.resolve(__dirname, "src/style.css"),
        from: path.resolve(__dirname, "libs/system.js")
      }
    ]),
    new CleanWebpackPlugin(["dist"])
  ],
  devtool: "cheap-module-eval-source-map",
  externals: [],
  mode: "development",
  devServer: {
    contentBase: __dirname + "/dist",
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      "/reactApp": {
        target: "http://localhost:9001",
        pathRewrite: function(url) {
          return url.replace(/\/reactApp/, "");
        }
      },
      "/vueApp": {
        target: "http://localhost:9002",
        pathRewrite: function(url) {
          return url.replace(/\/vueApp/, "");
        }
      },
      "/a1App": {
        target: "http://localhost:9003",
        pathRewrite: function(url) {
          return url.replace(/\/a1App/, "");
        }
      },
      "/a7App": {
        target: "http://localhost:9004",
        pathRewrite: function(url) {
          return url.replace(/\/a7App/, "");
        }
      }
    }
  }
};
