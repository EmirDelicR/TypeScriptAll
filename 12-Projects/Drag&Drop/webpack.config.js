const path = require("path");

module.exports = {
  mode: "development",
  entry: "./script.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "js"),
    publicPath: "js"
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }]
  }
};
