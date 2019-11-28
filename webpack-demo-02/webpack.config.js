
//constantes necearias para el module.exports
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  mode: 'development',

  //CONTEXT: Ruta absoluta con el directorio base para resolver los ENTRYs y LOADERs desde la configuración
  context: path.resolve(__dirname, 'src/js'),   //elijo el que tengo los bundless
  
  //ENTRYs: Puntos en los que empezar el proceso de empaquetamiento respecto al `context`
  entry: {
    index: './index.js',   
    // print: './print.js',
    // another: './another-module.js',
  },

  //OUTPUTs: Indican cómo y dónde generar los bundlets y assets asociados
  output: {
    path: path.resolve(__dirname, 'dist/jsDist'),
    filename: '[name].bundle.js',

    publicPath: '/jsDist/'
  },

  devtool: 'inline-source-map',  //herramienta para los source-maps

  devServer: {
    publicPath: '/jsDist/',  //decir dnd están los bundles respecto a la salida (dist)
    contentBase: path.join(__dirname, 'dist'), //decir a servidor de donde coger la información. solo para archivos estáticos 
    compress: true,
    port: 9000,
    // index: 'index.html',  //archivo considerado el índice
    liveReload: true,
    open: true,
    writeToDisk: true, //si queremos que escriba en disco (en lugar de guardar en cachó haciéndolo más lento)
  },

  plugins: [

    // new CleanWebpackPlugin(),

    // new HtmlWebpackPlugin({
    //   title: 'Organización Outputs ',
    //   // publicPatch: '/'
    // }),


  ],


  //divide los bundles, incluso los que estén compartidos
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },

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
        test: /\.(png|svg|jpg|gif)$/, //manejo de IMÁGEMES con FILE-LOADER
        use: [
          {
            loader: 'file-loader',
            options: {
              
              //FILE-LOADER.CONTEXT
              context: path.resolve(__dirname, 'src/assets'), // contexto para las assets (el path depende del contexto)
              
              //DESTINO
              outputPath: '../assetsDist',       //lugar de reemplazo respecto OUTPUT.PATH
              name : '[path][name].[ext]', // path mantiene estructura respecto FILE-LOADER.CONTEXT
              publicPath: 'assetsDist/'       //lugar en el server/navegador respecto '/' (siempre igual que outputPath?)
            }
          }
          
        ],
      },

      {
        test: /\.html$/, //manejo de HTML con FILE-LOADER
        use: [
          {
            loader: 'file-loader',
            options: {
              
              //FILE-LOADER.CONTEXT
              context: path.resolve(__dirname, 'src/views'), // contexto para las assets (el path depende del contexto)
              
              //DESTINO
              outputPath: '../',       //lugar de reemplazo respecto OUTPUT.PATH
              name : '[path][name].[ext]', // path mantiene estructura respecto FILE-LOADER.CONTEXT
              publicPath: '.'       //lugar en el server/navegador respecto '/' (siempre igual que outputPath?)
            }
          }
          
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