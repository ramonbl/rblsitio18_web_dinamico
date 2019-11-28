
//constantes necearias para el module.exports
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

  mode: 'development',

  entry: {
    app: './src/index.js',
    print: './src/print.js',
    another: './src/another-module.js',
  },

  devtool: 'inline-source-map',  //herramienta para los source-maps

  devServer: {
    publicPath: '/',  //decir dnd están los bundles respecto a la salida (dist)
    contentBase: path.join(__dirname, 'dist'), //decir a servidor de donde coger la información. solo para archivos estáticos 
    compress: true,
    port: 9000,
    index: 'index.html',  //archivo considerado el índice
    liveReload: true,
    open: true,
    writeToDisk: false, //si queremos que escriba en disco (en lugar de guardar en cachó haciéndolo más lento)
  },

  plugins: [

    // new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: 'Organización del Output y Caching',
    }),


  ],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  module: {
    rules: [

      {
        test: /\.css$/,     //exp_reg identifica CSS para los CSS-LOADER
        use: [
          'style-loader', //segundo loader
          'css-loader',  //primer loader
        ],
      },

      {
        test: /\.(png|svg|jpg|gif|html)$/, //manejo de IMÁGEMES con FILE-LOADER
        use: [
          'file-loader',
        ],
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,  //manejo de FUENTES con FILE-LOADER
        use: [
          'file-loader',
        ],
      },

      {
        test: /\.(csv|tsv)$/,   //manejo de CSV con CSV-LOADER
        use: [
          'csv-loader',
        ],
      },

      {
        test: /\.xml$/,       //manejo de XML con XML-LOADER
        use: [
          'xml-loader',
        ],
      },

    ],
  },
};