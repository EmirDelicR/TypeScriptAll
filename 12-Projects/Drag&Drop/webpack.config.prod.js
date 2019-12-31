const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./script.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "js")
  },
  devtool: "none",
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }]
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()]
};
