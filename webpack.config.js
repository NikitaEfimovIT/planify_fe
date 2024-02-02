const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
  mode: "development",
  entry: ["./src/index.tsx"],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(?:js|mjs|cjs|tsx|ts|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          // options: {
          // 	presets: [["@babel/preset-env", { targets: "defaults" }]],
          // },
        },
      },
    ],
  },
  watch: false,
  resolve: {
    extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html", filename: "index.html", title: "Webpack App" }),
  ],

  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true,
    historyApiFallback: true,
    port: 3006,
  },
}

module.exports =(env, argv) => {
  config.mode=argv.mode || "development"
  config.watch=argv.mode!=="production"
  return config
};
