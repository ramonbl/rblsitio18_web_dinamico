
//constantes necearias para el module.exports
const path = require('path');
var glob = require('glob')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {

  mode: 'development',

  //CONTEXT: Ruta absoluta con el directorio base para resolver los ENTRYs y LOADERs desde la configuración
  // (-) context: path.resolve(__dirname, 'src'),   //elijo el que tengo los bundless principales

  //ENTRYs: Puntos en los que empezar el proceso de empaquetamiento respecto al `context`
  entry: {
    index: './src/index.js',
  },

  //OUTPUTs: Indican cómo y dónde generar los bundlets y assets asociados
  output: {
    // (-) path: path.resolve(__dirname, 'dist/jsDist'),
    filename: '[name].[chunkhash].js',

    // publicPath: '/jsDist/'
  },

  //HERRAMIENTAS
  devtool: 'source-map',  //herramienta para los source-maps

  devServer: { // (-)
    // (-) publicPath: '/jsDist/',  //decir dnd están los bundles respecto a la salida (dist)
    // contentBase: path.join(__dirname, 'dist'), //decir a servidor de donde coger la información. solo para archivos estáticos 
    // compress: true,
    port: 9000,
    // index: 'index.html',  //archivo considerado el índice
    // liveReload: true,
    // open: true,
    // writeToDisk: true, //si queremos que escriba en disco (en lugar de guardar en cachó haciéndolo más lento)
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

      //TPL-HTML -> ES6-TEMPLATE-STRING: llamar a html desde html, trabajar con las template-string de JS para poder interpolar variables, valores y cadenas estáticas
      {
        test: /\.tpl.html$/,  //serán como los partials. Así Wpack no se confunde con los html
        use: [
          {
            loader: 'es6-template-string'
          }
        ]
      },

      // (-) HTML-> FILE-LOADER 
      {
        // test: /\.html$/, //manejo de HTML con FILE-LOADER
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {

        //       //FILE-LOADER.CONTEXT
        //       context: path.resolve(__dirname, 'src/views'), // contexto para las assets (el path depende del contexto)

        //       //DESTINO
        //       outputPath: '../',       //lugar de reemplazo respecto OUTPUT.PATH
        //       name: '[path][name].[ext]', // path mantiene estructura respecto FILE-LOADER.CONTEXT
        //       publicPath: '.'       //lugar en el server/navegador respecto '/' (siempre igual que outputPath?)
        //     }
        //   }

        // ],
      },

      //HTML-LOADER
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              // minimize: true
            }
          }
        ]
      },

      //CSS-LOADERS
      {
        test: /\.(css|scss)$/,     //exp_reg identifica CSS para los CSS-LOADER
        use: [

          //STYLE-LOADER
          'style-loader',

          //MINI-CSS-EXTRAC-PLUGIN
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // minimize: true,
              sourceMap: true,
            }
          },

          //CSS-LOADER
          {
            loader: 'css-loader',
            options: {
              // minimize: true, 
              sourceMap: true,
            }
          },

          //POSTCSS-LOADER
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browser: ['last 2 versions']
              },
              sourceMap: true,
              plugins: () => [autoprefixer]
            }
          },


          //RESOLVE-URL-LOADER
          'resolve-url-loader',

          //SASS-LOADER
          {
            loader: 'sass-loader',
            options: {
              // outputStyle: 'compressed',
              sourceMap: true
            }
          }
        ],
      },

      //IMÁGENES-> FILE-LOADER, (NO IMAGE-WEBPACK-LOADER)
      {
        test: /\.(png|svg|jpe?g|gif|svg|webp)$/, //manejo de IMÁGEMES con FILE-LOADER
        use: [
          //FILE-LOADER
          {
            loader: 'file-loader',
            options: {

              //FILE-LOADER.CONTEXT
              // (-) context: path.resolve(__dirname, 'src/assets/img'), // contexto para las assets (el path depende del contexto)

              //DESTINO
              // (-) outputPath: '../assetsDist/imgDist',       //lugar de reemplazo respecto OUTPUT.PATH 
              // (-) name: '[path][name].[ext]', // path mantiene estructura respecto FILE-LOADER.CONTEXT
              name: 'assets/[name].[ext]',
              // (-) publicPath: 'assetsDist/imgDist/'       //lugar en el server/navegador respecto '/
            }
          },

          // IMAGE-WEBPACK-LOADER
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     bypassOnDebug: true
          //   }
          // }
        ],
      },



      //FONTS + MEDIA + DOCS -> FILE-LOADER
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp4|mp3|txt|xml|pdf)$/, 
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]'
            }
          },
        ],
      },

      // (-) CSV-LOADER
      {
        // test: /\.(csv|tsv)$/,   //manejo de CSV con CSV-LOADER
        // use: [
        //   'csv-loader',
        // ],
      },

      // (-) XML-LOADER
      {
        // test: /\.xml$/,       //manejo de XML con XML-LOADER
        // use: [
        //   'xml-loader',
        // ],
      },

      

    ],
  },
  //PLUGINS
  plugins: [ 

    //CLEAN-WEBPACK-PLUGIN
    // new CleanWebpackPlugin(['dist/**/*.*']),

    //MINI-CSS-EXTRACT-PLUGIN
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].css'
    }),

    //HTML-WEBPACK-PLUGIN (solo una instancia xq solo tengo una entrada)
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html', 
    //   (-) hash: true,    //genera un hash
      chunks: ['js'],
      minify: {
        html5: true,  //sigue especificación html5
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: false
      },
    // (-) templateParameters: {titulo: 'Manual de Webpack',encabezamiento: 'Aprendo Webpack'}
    }),
  ],
}
