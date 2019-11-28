
//constantes necearias para el module.exports
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [

      // 
      {
        test: /\.css$/,     //exp_reg identifica CSS para los CSS-LOADERS
        use: [
          'style-loader', //segundo loader
          'css-loader',  //primer loader
        ],
      },

      {
        test: /\.(png|svg|jpg|gif)$/, //manejo de IMÁGEMES con FILE-LOADER
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