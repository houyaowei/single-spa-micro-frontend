const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",

  entry: {
    entry: "./src/entry.js",
    store: "./src/store.js"
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "release"),
    libraryTarget: "amd",
    library: "reactApp"
  },

  module: {
    rules: [
      {
        test: /\.js/,
        use: ["babel-loader?cacheDirectory"],
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/reactApp/"
            }
          }
        ]
      }
    ]
  }
};
