// const { merge } = require('webpack-merge')
import { merge } from 'webpack-merge'
import commonBin from './webpack.common.mjs'




  const config =  merge(commonBin, {
      // Set the mode to development or production
      mode: 'development',
    
      // Control how source maps are generated
      devtool: 'inline-source-map',
    
      // Spin up a server for quick development
      devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 8080,
      },
    
  })

export default config;
