
//constantes necearias para el module.exports
const path = require('path');
var glob = require('glob')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');


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

  //HERRAMIENTAS
  devtool: 'inline-source-map',  //herramienta para los source-maps

  devServer: {
    publicPath: '/jsDist/',  //decir dnd están los bundles respecto a la salida (dist)
    contentBase: path.join(__dirname, 'dist'), //decir a servidor de donde coger la información. solo para archivos estáticos 
    compress: true,
    port: 9000,
    index: 'index.html',  //archivo considerado el índice
    liveReload: true,
    open: true,
    writeToDisk: true, //si queremos que escriba en disco (en lugar de guardar en cachó haciéndolo más lento)
  },



  //OPTIMIZATION: divide los bundles, incluso los que estén compartidos
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },

  module: {
    rules: [

      //BABEL-LOADER
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },

      //TPL-HTML ->
      {
        test: /\.tpl.html$/,
        use: [
          {
            loader: 'es6-template-string'

          }
        ]
      },

      //HTML-LOADER
      {
        // test: /\.html$/,
        // use: [
        //   {
        //     loader: 'html-loader',
        //     options: {
        //       minimize: true
        //     }
        //   }
        // ]
      },
      //CSS-LOADERS
      {
        // test: /\.(css|scss)$/,     //exp_reg identifica CSS para los CSS-LOADER
        // use: [
        //   'style-loader',
        //   {
        //     loader: MiniCssExtractPlugin.loader,
        //     options: {
        //       minimize: true,
        //       sourceMap: true,
        //     }
        //   },

        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       autoprefixer: {
        //         browser: ['last 2 versions']
        //       },
        //       sourceMap: true,
        //       plugins: () => [autoprefixer]
        //     }
        //   },

        //   'css-loader',  //primer loader
        //   'resolve-url-loader',
        //   {
        //     loader: 'sass-loader',
        //     options: {
        //       outputStyle: compressed,
        //       sourceMap: true
        //     }
        //   }
        // ],
      },

      //IMÁGENES-> FILE-LOADER
      {
        test: /\.(png|svg|jpe?g|gif|svg|webp)$/, //manejo de IMÁGEMES con FILE-LOADER
        use: [
          {
            loader: 'file-loader',
            options: {

              //FILE-LOADER.CONTEXT
              context: path.resolve(__dirname, 'src/assets/img'), // contexto para las assets (el path depende del contexto)

              //DESTINO
              outputPath: '../assetsDist/imgDist',       //lugar de reemplazo respecto OUTPUT.PATH 
              name: '[path][name].[ext]', // path mantiene estructura respecto FILE-LOADER.CONTEXT
              publicPath: 'assetsDist/imgDist/'       //lugar en el server/navegador respecto '/' (siempre igual que outputPath?)
            }
          },

          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     bypassOnDebug: true
          //   }
          // }

        ],
      },

      //HTML-> FILE-LOADER
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
              name: '[path][name].[ext]', // path mantiene estructura respecto FILE-LOADER.CONTEXT
              publicPath: '.'       //lugar en el server/navegador respecto '/' (siempre igual que outputPath?)
            }
          }

        ],
      },

      //FONTS -> FILE-LOADER
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,  //manejo de FUENTES con FILE-LOADER
        use: [
          {
            loader: 'file-loader',
            options: {

            }
          },
        ],
      },

      //CSV-LOADER
      {
        test: /\.(csv|tsv)$/,   //manejo de CSV con CSV-LOADER
        use: [
          'csv-loader',
        ],
      },

      //XML-LOADER
      {
        test: /\.xml$/,       //manejo de XML con XML-LOADER
        use: [
          'xml-loader',
        ],
      },

      //TXT, PDF -> FILE-LOADER
      {
        test: /\.(txt,pdf)$/,       //manejo de TXT con FILE-LOADER
        use: [
          {
            loader: 'file-loader',
            options: {

            }
          },
        ]
      },

      //MP4, MP3 -> FILE-LOADER
      {
        test: /\.(mp4|mp3)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ]
      },


    ],
  },
  //PLUGINS
  plugins: [ //HTML-WEBPACK-PLUGIN, MINI-CSS-EXTRACT-PLUGIN
    
    new MiniCssExtractPlugin({
      // filename: '[name].css'
    })
     //HTML-WEBPACK-PLUGIN
    // new HtmlWebpackPlugin({
    //   template: './src/views/template.html',
    //   filename: 'index.html',    //de salida. por defecto es ese
    //   hash: true,    //genera un hash
    //   chunks: ['js'],
    //   minify: {
    //     html5: true,
    //     collapseWhitespace: true,
    //     caseSensitive: true,
    //     removeComments: true
    //   },
    //   templateParameters: {
    //     titulo: 'Manual de Webpack',
    //     encabezamiento: ' Aprendo Webpack'
    //   }
    // }),
  ],
}
