const path = require('path')
dirname(fileURLToPath(import.meta.url))
module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),

  sunbin :path.resolve(__dirname, '../tsconfig.app.json')
      "start2": "cross-env NODE_ENV=development webpack serve --config config/webpack.dev.mjs",
    "start3": "cross-env NODE_ENV=development webpack serve --config config/paths.js",
  
}
