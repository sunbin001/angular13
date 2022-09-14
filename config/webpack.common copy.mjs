// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

import CleanWebpackPlugin from 'clean-webpack-plugin'

import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// const CopyWebpackPlugin = require('copy-webpack-plugin')

// const HtmlWebpackPlugin = require('html-webpack-plugin')
import AngularWebpackPlugin from '@ngtools/webpack'
import { CommonModule } from '@angular/common'
// import ContextReplacementPlugin from 'webpack'
// const { AngularWebpackPlugin  } = require('@ngtools/webpack')
// const { ContextReplacementPlugin} = require('webpack')
// const HappyPack = require('happypack')
const paths = {
  // Source files
  src: __dirname('../src'),

  // Production build files
  build:__dirname('../dist'),

  // Static files that get copied to build folder
  public:__dirname('../public'),

  sunbin :__dirname('../tsconfig.app.json')
  
}

// const path2 = require('path')
const linkerPlugin = require('@angular/compiler-cli/linker/babel');
console.dir(paths)

export class CommonBin  {

  constructor() {
    this.data = {
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
    // new  ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path2.join(__dirname, './app')),   
    

    //             new HappyPack({
    //                 threads: 4,
    //                 loaders:
    //                     [
    //                         {
    //                             loader: 'ts-loader',
    //                             options: { transpileOnly: true, happyPackMode: true }
    //                         }
    //                     ]
    //             }),

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
      { test: /\.m?js$/, use: { loader: 'babel-loader', options: { plugins: [linkerPlugin] } } },
            {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    //   {
    //   // JavaScript: Use Babel to transpile JavaScript files
    //   // {
    //   //   test: /\.[jt]sx?$/,
    //   //   loader: '@ngtools/webpack',
    //   // },            {
    //     test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
    //     use: [
    //         {
    //             loader: 'cache-loader'
    //         },
    //         {
    //             loader: 'happypack/loader'
    //         },
    //         {
    //             loader: 'angular-router-loader'
    //         },
    //         {
    //             loader: 'angular2-template-loader?keepUrl=false'
    //         },
    //         // {loader: '@ngtools/webpack'}
    //     ],
    //     include: [path2.resolve(__dirname, "app")],
    //     exclude: [path2.resolve(__dirname, "node_modules")]
    // },
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

  }

}

