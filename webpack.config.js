/* eslint-env node */
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;

module.exports = (/* env = {} */) => {
  return {
    mode: NODE_ENV,

    node: false,

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
      extensions: [".tsx", ".ts", ".js"],

      alias: {
        src: path.resolve(__dirname, "src/")
      }
    },

    module: {
      rules: [
        {
          test: /\.svg$/i,

          oneOf: [
            {
              resourceQuery: /inline/,
              use: [
                {
                  loader: 'raw-loader',
                },
                {
                  loader: 'svgo-loader',
                  options: {
                    plugins: [
                      { removeScriptElement: true },
                      { removeViewBox: false },
                      { removeDimensions: true },
                      { removeAttr: 'id' },
                    ],
                  },
                },
              ],
            },
            {
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    outputPath: 'assets/images',
                  },
                },
                {
                  loader: 'svgo-loader',
                  options: {
                    plugins: [{ removeScriptElement: true }],
                  },
                },
              ],
            },
          ],
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: "babel-loader"
        },

        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: "graphql-tag/loader"
        }
      ]
    },

    loader: {
      test: /\.(html|png|ico|json)$/,
      loader: "file?name=[path][name].[ext]&context=./static"
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
      }),

      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 20000
      }),
      new CopyWebpackPlugin([{ from: "public" }])
    ],

    devServer: {
      hot: true,
      host: "::", // Listens on all IPv4 and IPv6 interfaces
      port: 3000,
      historyApiFallback: true,

      proxy: {
        "/api/graphql": {
          target: "http://william.multimediatech.cz:8081/air2day-test",
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
};
