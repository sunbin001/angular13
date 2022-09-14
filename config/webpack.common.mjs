
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import {CleanWebpackPlugin} from 'clean-webpack-plugin'

import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// const CopyWebpackPlugin = require('copy-webpack-plugin')

// const HtmlWebpackPlugin = require('html-webpack-plugin')
import {AngularWebpackPlugin} from '@ngtools/webpack'

import path from 'path' 
// import __dirname from 'dirname'
// console.dir(path.resolve(__dirname, '../src'))
// console.dir( dirname('../dist').resolve())
const paths = {
  // Source files
  src:'/Users/sunbin/Desktop/angular13/test/src',

  // Production build files
  build: '/Users/sunbin/Desktop/angular13/test/dist',

  // Static files that get copied to build folder
  public: '/Users/sunbin/Desktop/angular13/test/public',

  sunbin :'/Users/sunbin/Desktop/angular13/test/tsconfig.app.json',
  
  
}

// const path2 = require('path')

// const path = require('path')

// import path from 'path'
import linkerPlugin from '@angular/compiler-cli/linker/babel';


const commonBin  = {
  // Where webpack looks to start building the bundle
  entry:{
    polyfills: paths.src + '/polyfills.ts',
    styles: paths.src + '/styles.scss',
    // vendor: paths.src +'/vendor.ts',
    main: paths.src + '/main.ts',
  },
  // resolve: {
  //   extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
  //   fallback: {
  //       "crypto": false
  //   }
  // },
  // Where webpack outputs the assets and bundles

  // http://www.ty2y.com/study/jmwebpackloader.html
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  mode: 'development',

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding 
    new CleanWebpackPlugin(),
    new AngularWebpackPlugin({
      tsconfig: paths.sunbin,
      jitMode: false,
      directTemplateLoading: true,
    }),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
  
      template: paths.src + '/index.html', // template file
      filename: 'index.html', // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
          {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
        include: ['/Users/sunbin/Desktop/angular13/test/src/styles']
      },
      
        {
      test: /\.scss$/,
      use: [
        {loader: 'to-string-loader'},
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        },
        { loader: 'postcss-loader', options: { sourceMap: true } },
        { loader: 'sass-loader', options: { sourceMap: true } },
      ],
      exclude: ['/Users/sunbin/Desktop/angular13/test/src/styles']
    },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },

      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack'
      },
      {   
          exclude:  paths.src + '/index.html',
          test: /\.html$/,
          loader: 'raw-loader'
      },
      {
        test: /\.[cm]?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            compact: false,
            plugins: [linkerPlugin],
          },
        },
      },

    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.ts', '.json'],
    mainFields: ['es2017','es2020', 'browser', 'module', 'main'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}


export default commonBin;
