const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Add Webpack plugin to generate HTML and inject bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      // TODO: Add and configure workbox plugins for a service worker and manifest file.
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      // Manifest.json
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        orientation: 'portrait',
        display: 'standalone',
        short_name: 'JATE',
        description: 'Just Another Text Editor!',
        background_color: '#ffffff',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          }
        ]
      })
    ],

    module: {
      // TODO: Add CSS loaders and babel to webpack.
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], 
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules| bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ]
            },
          },
        },
      ],
    },
    devServer: {

      compress: true,
      hot: true,
      watchFiles: ['./src/index.html']
    }
  };
};
