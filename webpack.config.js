/* eslint-env node */
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;
const API_URI = process.env.API_URI;

module.exports = (/* env = {} */) => {
  return {
    mode: NODE_ENV,

    node: { global: true },

    devtool: NODE_ENV === "development" ? "source-map" : false,

    entry: {
      app: "src"
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/"
    },

    resolve: {
      extensions: [".tsx", ".ts", ".mjs", ".js"],

      alias: {
        src: path.resolve(__dirname, "src/")
      }
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: "babel-loader"
        },

        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: "graphql-tag/loader"
        },

        {
          test: /\.(png|jpe?g)$/i,
          use: [
            {
              loader: "file-loader"
            }
          ]
        }
      ]
    },

    loader: {
      test: /\.(html|ico|json)$/,
      loader: "file?name=[path][name].[ext]&context=./static"
    },

    plugins: [
      new webpack.EnvironmentPlugin([
        "NODE_ENV",
        "API_URI",
        "AUTH_TOKEN",
        "GOOGLE_API_KEY"
      ]),

      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 20000
      }),
      new CopyWebpackPlugin({ patterns: [{ from: "public" }] })
    ],

    devServer: {
      hot: true,
      host: "::", // Listens on all IPv4 and IPv6 interfaces
      port: 3000,
      historyApiFallback: true,

      proxy: {
        "/graphql": {
          target: API_URI,
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
};
