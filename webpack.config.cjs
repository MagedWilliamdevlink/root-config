const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => ({
  entry: path.resolve(__dirname, "browser/root-config"),
  output: {
    filename: "isomorphic-mf-root-config.js",
    libraryTarget: "system",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // ensure publicPath is defined
  },
  devtool: "source-map", // 'sourcemap' was renamed to 'source-map' in Webpack 5
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    host: "0.0.0.0", // replace `disableHostCheck` with `host` and `allowedHosts` settings
    allowedHosts: "all", // allow all hosts to replace `disableHostCheck`
  },
  plugins: [
    new CleanWebpackPlugin(), // CleanWebpackPlugin is compatible with Webpack 5
  ],
  externals: [
    "single-spa",
    /^@isomorphic-mf\/.+$/i // Webpack 5 uses object format for externals
  ],
  experiments: {
    topLevelAwait: true, // Enable top-level await if necessary in Webpack 5
  },
});