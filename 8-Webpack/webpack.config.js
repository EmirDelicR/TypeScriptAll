module.exports = {
  entry: "./script.ts",
  output: {
    filename: "./js/bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  }
};
