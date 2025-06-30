const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, "src/scripts/sw.js"),
      swDest: "sw.js",
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      include: [
        /\.html$/,
        /\.js$/,
        /\.css$/,
        /\.png$/,
        /\.jpg$/,
        /\.jpeg$/,
        /\.svg$/,
        /\.gif$/,
        /\.ico$/,
        /manifest\.json$/,
      ],
      dontCacheBustURLsMatching: /\.\w{8}\./,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 20,
      minSize: 20000,
      maxSize: 50000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `vendor.${packageName.replace("@", "")}`;
          },
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
