const path = require('path')
const packageJSON = require('./package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROJECT_ROOT = path.resolve(__dirname, './')
const APP_ENTRY = path.join(PROJECT_ROOT, 'src')
const PUBLIC_ENTRY = path.join(PROJECT_ROOT, 'public')

console.log('PROJECT_ROOT >>', PROJECT_ROOT)
console.log('APP_ENTRY >>', APP_ENTRY)

const version = `${packageJSON.version}`
const JS_FILENAME = `app.${version}.[chunkhash].js`

module.exports = {
  mode: 'development',
  entry: `./src/index.tsx`,
  output: {
    filename: JS_FILENAME,
    chunkFilename: '[name].[hash].js',
    path: `${PROJECT_ROOT}/build`,
    publicPath: `/plink`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      /*{
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: ['ts-loader']
      }*/
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'css'],
    alias: {
      '@': APP_ENTRY
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${PUBLIC_ENTRY}/index.html`
    })
  ],
  devServer: {
    port: 3005,
    hot: true,
    open: true,
    historyApiFallback: true, // connect-history-api-fallback error 방지
  },
}
