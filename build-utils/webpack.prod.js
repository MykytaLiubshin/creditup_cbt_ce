const commonPaths = require("./common-paths");
const process = require("process");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  mode: "production",
  entry: {
    app: ["babel-polyfill", `${commonPaths.appEntry}/index.js`],
  },
  output: {
    filename: "static/[name].bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
              esModule: true,
              modules: {
                compileType: "module",
                mode: "local",
                exportLocalsConvention: "camelCaseOnly",
                namedExport: true,
              },
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].[fullhash].css",
    }),
  ],
};

module.exports = config;
