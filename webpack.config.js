const path = require("path");

module.exports = {
  devtool: "cheap-source-map",

  entry: ["./client/index.js"],

  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "static/js"),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
    ],
  },
};
