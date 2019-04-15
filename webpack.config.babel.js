import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.[hash:16].js'
  },
  mode: 'development',
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'images'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  resolve: {
    alias: {
      containers: path.resolve(__dirname, 'src/containers')
    }
  },
  devServer: {
    contentBase: './dist',
    port: '4003',
    host: 'localhost',
    historyApiFallback: true,
    open: 'Chrome',
    hot: true,
    inline: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}