const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    port: 3002,
    historyApiFallback: false,
  },
  output: {
    publicPath: "auto",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/i,
        type: "asset/resource", // veya 'file-loader' kullanabilirsin
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "basketRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./Basket": "./src/components/Basket",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^19.1.1",
          strictVersion: false,
          eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.1.1",
          strictVersion: false,
          eager: true,
        },
        "react-redux": {
          singleton: true,
          requiredVersion: "^9.2.0",
          strictVersion: false,
          eager: true,
        },
        "@reduxjs/toolkit": {
          singleton: true,
          requiredVersion: "^2.8.2",
          strictVersion: false,
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
