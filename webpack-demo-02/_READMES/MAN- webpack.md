# WEBPACK 4
[Webpack 4, Curso Práctico - YouTube](https://www.youtube.com/watch?v=vF2emKbaP4M&list=PLL0TiOXBeDag4uKXT_m5t65AR_rD0VBhA&index=6)
[Webpack desde cero](https://es.slideshare.net/FcoJavierNezBerrocoso/webpack-desde-cero)
[GitHub - javiernuber/webpack-caceresjs](https://github.com/javiernuber/webpack-caceresjs)

[Primeros pasos con Webpack](https://desarrolloweb.com/articulos/primeros-pasos-webpack.html)

[Concepts | webpack](https://webpack.js.org/concepts/#entry)

---

**Module loaders: (cargadores de módulos)** son aplicaciones que gestionan las dependencias y cargan los módulos (**RequireJS**, **SystemJS**)

**Module bundlers: (empaquetador de módulos)** son aplicaciones que gestionan dependencias, cargan módulos y generan un solo código encadenado y minificado (paquete)(**Browserify**, **Webpack**, **Parcel**)

**WEBPACK** es un *module bundler* para  Frontend independiente del stack de desarrollo a usar (Angular, React, Vue, Ember, Vanilla JS) que, además:

- Transforma código y automatiza tareas
- Permite empaquetados parciales y configuraciones según entorno
- Permite Tree shacking, Caching, Shimming y Splitting
- Gestión de carga asíncrona



WEbpack4 permite usar la herramienta sin archivo de configuración respecto WEBPACK 3.

Nace alrededor de la librería React de FB orientado a componentes con `import/export`.
Larabel lo usa internamente.
Los navegadores solo entiende JS puro, CSS y HTML planos

![](https://image.slidesharecdn.com/webpack-desde-cero-181009203019/95/webpack-desde-cero-12-638.jpg?cb=1539117112)

Un montón de módulos de todos los tipos relacionados desde uno principal (o varios) se convertirán en recursos estáticos a través de webpack. 

Trabaja desde un punto de entrada que, por defecto, es el **`index.js`** que usaremos para cualquier tipo de compilación.

## Conceptos Básicos

### Entry point

- Punto en el que empezará a analizar el código para producir los correspondientes paquetes.

- De él, es desde donde se importan los demás.

- Puede haber múltiples *entry points*.

- Por defecto es **`./src/index.js`**



### Output 

- Configuración para el punto de la salida con el paquete (o paquetes) resultantes

- Se encarga del directorio de salida y del nombrado de archivos.

- Por defecto es **`./dist/main.js`



### Loaders

- Permiten cargar todo tipo de archivos (imágenes, fuentes, hojas de estilo, ficheros json, lenguajes como Sass, PostCss, Vue, Jsx,...).


### Plugins

 Amplian el rango de funcionalidad de webpack como:

 - Comprimir con **Uglify** 
 - Dividir bundles en chunks más pequeños para que App cargue más rápido ...

### Mode

- Los modos **`production`**, **`development`** o **`none`** habilitan distintas optimizaciones integradas en el paquete

## INSTALACIÓN ej00-Por-defecto

- Necesario NodeJs (yo: NodeJS12)

- Recomendable instalarlo de manera global y obligarorio localmente con la versión adecuada de cada proyecto.
```bash
# instalar el paquete y los comandos de consola
npm i -g webpack webpack-cli

# crear package.json
npm init

# instalación local
npm i -D webpack webpack-cli

# ver versión global
webpack -v

# ejecutar webpack
webpack # da errores porque no está correcto el sistema de archivos
```


- Necesita saber donde empezar a leer el JS (por defecto busca `./src/index.js`)

```bash

## Creación de fichero de prueba en ./src/index.js
echo "console.log('Hola, soy WEBpack')" > src/index.js

## genera bundle ./dist/main.js  a partir  del ./src/index.js 
webpack
# equiv: 


## indicar modo desarrollo
webpack --mode development
## indicar modo producción
webpack --mode production
```
- Por defecto, **`webpack`** &equiv; a: 
**`webpack --mode production ./src/index.js --output ./dist/main.js --config webpack.config.js`**

- Es interesante crear **scripts** en el **`package.json`** con estos comandos y otros

```json
{
  //...
  "scripts":{
    "dev": "webpack --mode development",
    "build": "webpack --mode production ./dev/js/main.js --output ./public/js/",
    "custom": "webpack ./dev/js/main.js --output ./dist/js/",
    "loader-css-style": "webpack --watch", //observación y recompilación
    "start": "webpack-dev-server --open"
  }
  //...
}
```
a los que podemos accedemos con: **`npm run <script>`**

## Configuración con `webpack.config.js`

Es un fichero JS que permite exportar a webpack un objeto con una determinada configuración más compleja.

Por defecto es **`webpack.config.js` pero podríamos llamar a otro con **`--config <config>`**. 

Hacemos las instalaciones de dependencias necesarias:

```bash
npm i -D html-webpack-plugin #creación html

npm i -D style-loader # permite imprimir el archivo css en pantalla
npm i -D css-loader   # permite cargar archivos css e interpretarlos en el js

npm i -D mini-css-extract-plugin # extrae CSS en archivos separados

npm i -D postcss-loader # para autoprefijos y compatibilidad
npm i -D resolve-url-loader #transforma rutas relativas

npm i -D sass-loader -D # cargador de SASS
npm i -D node-sass # compilador SASS

npm i -D webpack-dev-server # generación de servidor

npm i -D babel-loader #cargar js para transpilar
npm i -D @babel/core # core de Babel
npm i -D @babel/preset-env #Estándar ECMA

npm i -D url-loader #Carga y transforma archivos en base64 (imágenes, fuentes, ...)
npm i -D file-loader #Extrae ficheros a carpeta destino para uso con url-loader
npm i -D image-webpack-loader #minifica imágenes con imagemin

npm i -D clean-webpack-plugin #limpia el destion (.dist)

npm i -D @babel/preset-react #Compila JX a JS
npm i -S react react-dom # Dependencias proyecto REACT

```

**CACHING:**  Control del cacheo de ficheros por parte del navegador mediante `hash` o `chunkhash`. 

**SPLITTING:** Dividir los empaquetados en trozos para optimizar la carga.

  - Separación del CSS (`MiniCssExtractPlugin`)
  - Separación de librerías externas (`optimization`)
  - Carga asíncrona de módulos

      Podemos indicar que se genere un paquete mínimo con lo que más se suele usar e ir cargando otros módulos a medida que se necesitan mediante **`import`**

      ```js
      async function determineDate(){
        const moment = await import('moment');
        return moment().format('MMMM Do YYYY, h:mm:ss a');
      }

      determinateDate().then(str => console.log(str));
      ```


```js
// IMPORTACIONES
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// VARIABLES

const config = {
  
  mode: 'development',

  entry: { 
    home: path.resolve(__dirname, './src/js/index.js', 
    blog: path.resolve(__dirname, './src/js/blog.js', 
    contact: path.resolve(__dirname, './src/js/contact.js',
    vendor: path.resolve(--dirname, './src/js/vendors/vendor.js)
  },

  //CACHING:salida con control de cacheo de ficheros por parte del navegador mediante hash
  //hash hace que cambie en cada empaquetado
  //chunkhash solo cambia si cambia el fichero
  output: { 
    path: path.resolve(__dirname, './dist', 
    filename: 'js/[name].[chunkhash].js' //nombre entrada.hash_generado en cada empaquetado
  },

  module: {

    rules: [
      // URL_LOADER
      {
        test: /\.(jpg|png|gif|woff|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
            name: 'images/[name].[hash].[ext]', //gracias file-loader
          }
        }
      }
      // BABEL-LOADER
      {
        test; /\.js$,
        exclude: /(node_modules)/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react]
          }
        }
      }
      // CSS-LOADER
      {
        test: /\.(css|scss)$/,  //expresión regular con el tipo de archivo
        use: [            // usa cargadores de abajo a arriba

          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },

      // JSON-LOADER (NO NECESARIO EN WEBPACK 4)
      // {
      //   test: /\.json$/,  
      //   use: 'json-loader'
      // }
    ],

    plugins: [
      new MiniCssExtractPlugin({
        filename: "./css/styles.css" //lugar de extracción del CSS
      })
    ]
  },

  optimization:{
    splitChunks:{
      cacheGroups:{
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
  //OBSERVACIÓN Y RECOMPILACIÓN DE ARCHIVOS AL CAMBIAR
  watch: true,
  watchOptions{
    aggregateTimeout: 300,
    poll: 1000,
    ignored: ['files/**/*.js, 'node_modules']
  },

  devServer:{
    contentBase: path.join(__dirname),  //ruta por defecto: ./dist
    open: true,  //abre pestaña en navegador
    compress: true, //comprime en gzip
    puclicPatch: "/dist/", //archivos disponibles en esta ruta
    port: 9000
  }
  

}

module.exports = config;
```


### 


## Ejemplso
### Ej01-webpack-starter-kit

Creamos nueva carpeta y dentro de ella volvemos a hacer lo mismo.
Aquí veremos que no es necesario el `webpack.config.js`

```bash
npm init #archivo ppal: webpack.config.js
npm i -D webpack webpack-cli
```
Modificamos el `package.json` para crear dos scripts `build` y `dev` (solo con el comando `webpack`) al que podremos llamar con `$ npm run build | dev`.

Dará error si no tenemos un `.src/index.js`. Así que lo creamos con un pequeño mje en JS.

```json
{
  "name": "ej01-webpack-starter-kit",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "dev": "webpack --mode development",
    "dev-personal": "webpack --mode development ./foo/src/in.js --output ./foo/out.js",
    "build": "webpack --mode production",
    "build-personal": "webpack --mode production ./foo/src/in.js --output ./foo/out.js"
  },
  "author": "RamonBL",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
  }
}
```

```bash
# ejecutamos script
npm run build
  OUT:
    Hash del archivo generado y otros datos.

# ejecutamos script para transpilar archivo en rutas IN/OUT específicas
npm run build-personal

```

- Configurar el archivo `webpack.config.js` para hacer que se adapte a nuestro proyecto






### Ej02-webpack-starter-kit-personalizado

Usaremos un archivo de configuración **`webpack.config.js`** en la raíz del proyecto junto al `package.json` (o en otro lugar per habría que invocar `webpack --config RUTA_CONFIG`).

Cada `index.js` de un módulo puede importar código de otros módulos y exportar código haca afuera.

**`package.json`**
```json
{
  "name": "ej02-webpack-starter-kit-personalizado",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "build": "webpack --mode production",
    "builddev": "webpack --mode development"
  },
  "author": "RamonBL",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
  }
}
```

- Para importar un módulo usamos **`require('MÓDULO')`**.
  Almacenamos el módulo en una variable (con mismo nombre si queremos).

- Para exportar código JS usamos **`module.exports`**. Ese código podrá ser usado por el fichero/módulo que estemmos programando.

- **`path.resolve()`** devuelve un camino absoluto juntando todas las secuencias.
  **`__dirname`** guarda la ruta absoluta en nuestro disco del módulo.


**`webpack.config.js`**
```js
// configurar salida del bundle
const path = require('path'); // módulo de Node que permite trabajar con ficheros

module.exports = {  //código que puede exportar este módulo con un require('webpack.config.js') desde otro.

  output: {   // definimos salida con la propiedad output del objeto a exportar
    path: path.resolve(__dirname, 'public_html/js'),
    filename: 'app.js' //damos un nombre personalizado en lugar de index.js
  },

  entry: {
    main: './fuentes/inicio.js' //con el archivo de entrada del proyecto
  }
}

```

Al ejecutar `npm run build` buscará el archivo de entrada `entry`


### Ej03-Webpack-Babel. Transpilando de E6 a E5 con webpack y babel. 

Transpilado: Compilación/Traducción de un código creado con versiones superiores de JS (o **supersets** como TypeScript) es transformado a código legible por todos los navegadores.

Los navegadores no interpretan correctamente las últimas tecnologías JS.
Nosotro podemos querer usar las últimas novedades para hacer código más legible.
Necesitamos transformarlo del nuestro al plano.

Para la trasnpilación usaremos **BabelJS** que podemos usar con otras utilidades distintas a Webpack.

```bash
npm init
npm i -D webpack webpack-cli

## Instalar la dependencia de desarrollo: babel-loader8, babel7
## [GitHub - babel/babel-loader: 📦 Babel loader for webpack](https://github.com/babel/babel-loader)
npm install -D babel-loader @babel/core

## Selección de tipo de transpilado mediante preset-env
npm i -D @babel/preset-env

## Crear archivo `.babelrc` de tipo `json` de configuración de babel7 (en babel6 es 'env')
edit .babelrc
  IN:
    {
      "presets": ["@babel/preset-env"],
      "plugins": []
    }   
```



Creamos el **`webpack.config.js`**
```js
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'public_html/js'),
    filename: 'app.js'
  },
  
  entry: {
    main: './fuentes/inicio.js'
  },  
  
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      }
    ]
  }
}
// Probar si se puede convertir a ES6
```
Creamos el **`./fuentes/inicio.js`**
```js
class miClase {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  muestraX() {
    console.log(this.x);
  }

  sumar(...valores) {
    let suma = 0;
    for(let i in valores) {
      suma += valores[i];
    }
    return suma;
  }
}

const miObj = new miClase(2, 5);
miObj.muestraX();

console.log(miObj.sumar(2, 4, 5, 6));
```

Ahora ya estamos habilitados para trabajar con ES6 para exportar del originen con JS de alto nivel al destino con JSpuro.
```bash
## Ejecutamos `webpack` que seguirá la configuración de `webpack.config.js`
webpack

```

Por lo que tb estaremos habilitados para realizar **`import`** desde nuestro archivo origen `./fuentes/inicio.js` .

Para imporar un módulo que tengamos en: `./fuentes/modules/miModulo.js` de forma que podamos tener todo bien organizado:

```js
import './modules/miModulo.js';

class Miclase {
// ... continuación code anterior ...
```

Hasta ahora, tenemos configurado la entrada, la salida y el cargador de babel para cada archivo `.js` gracias a `webpack.config.js`; así como el `.babelrc` con los presets y plugins del cargador.

Podríamos evitar el archivo `.babelrc` con la siguiente disposición del `webpack.config.js`:

```js
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'public_html/js'),
    filename: 'app.js'
  },
  
  entry: {
    main: './fuentes/inicio.js'
  },  
  
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [["@babel/preset-env"]],
            plugins: []
          }
        }
      }
    ]
  }
}
```

Gracias tb a tener habilitado ES6, podemos importar librerías instaladas vía npm (en lugar de usar los `require()`)

1. 
    ```bash
    ## La instalamos en nuestro proyecto.
    npm i moment  ##librería para el trabajo con fechas.
    ```

2. **`miArchivo.js`**
    ```js
    import moment from 'moment';
    import es from 'moment/locale/es';

    let tiempoDesde = moment("20180611", "YYYYMMDD").fromNow();
    ```

3. ejecución con `webpack`, `npm run <script_del_package.json>`.



### Inyectar Bundles JS en el HTML

Queremos inyectar con Webpack los correspondientes scripts, y otros elementos, en un archivo HTML generado, para instalar el contenido de los bundles en el proyecto con **HTML Webpack Plugin`**. 

Tb podemos inyectar el CSS, manifest, favicon, ....
Incluso enlazar con un JS que tenga un hash al final de modo que en cada actualización cambie su nombre y se eviten efectos poco deseables en el desarrollo.

1. **Copiamos el package.json del ej03**, instalamos con el `npm install` y modificamos los orígenes y destinos.

2. 
    ```bash
    npm i -D html-webpack-plugin
    ```
3. Modificamos `webpack.config.js`

    ```js
    /* CONFIGURACIÓN HtmlWebpackPlugin
    [GitHub - jantimon/html-webpack-plugin: Simplifies creation of HTML files to serve your webpack bundles](https://github.com/jantimon/html-webpack-plugin)


    * Tenemos en nuestro entorno de desarrollo:

    * 1. Plantilla html `./dev/index.html`
    * 2. Nuestro archivo principal js (importará a otros si entiende ES6) `./dev/js/index.js`
    * 
    * 
    * Al ejecutar el webpack se generan en el entorno de producción `./dist`
    * 
    * 1. El archivo principal JS en `./dist/js/main.js`
    * 1. El archivo `index.html` en función del template con la inyección del `main.js`
      */


    const HtmlWebpackPlugin = require('html-webpack-plugin');

    /* Módulo para la inyección de bundless en html */
    module.exports = {

      /* entrada del archivo principal js que importa a otros */
      entry: './dev/js/index.js',  

      //salida del archivo .html y del main_bundle.js (dentro del path)
      output: {
        path: __dirname + '/dist',
        filename: 'js/main.js'
      },

      mode: 'development',

      plugins: [
        new HtmlWebpackPlugin({   //instanciamos un plugin
          filename: 'index.html',    //de salida. por defecto es ese
          template: './dev/pages/template.html',
          hash: true,    //genera un hash
          templateParameters: {
            titulo: 'Manual de Webpack',
            encabezamiento: ' Aprendo Webpack'
          }
        }),  

        new HtmlWebpackPlugin({  
          filename: 'nosotros.html',    
          template: './dev/pages/template.html',
          hash: true,    
          templateParameters: {
            titulo: 'Nosotros',
            encabezamiento: 'Soy la pera'
          }
        }),  
      ]
    }
    ```







### Creación de 2 Bundle: 1 sin transpilar y el otro transpilado + CSS.

#### Bundless para transpilación
Podíamos querrer otro de ES7 (si lo usásemos para construcciones async/await) a E6 para los modernos

Queremos que si navegador entiende ES6 lo aproveche, para algunos navegadores que queremos que aprovechen el JS, tendremos que transpilarlos.

Queremos crear 2 bundles con configuraciones distintas:

1. Código original
2. Código transpilado

Añadimos otro plugin para webpack (realmente es de HTML webpack plugin) para poder agregar cualquier tipo de atributo en las etiquetas `script` colocadas por el HTML Webpack Plugin

```bash
# Instalación del plugin para inyectar etiquetas en los escripts generados por el html-webpack-plugin
npm install -D script-ext-html-webpack-plugin
```
Hecmos el `require` e instanciamos el plugin en el array `plugins` del `webpack.config`

Necesitaremos 2 configuraciones para Babel, una con transpilado y otra sin ella.

Archivos al final ...
#### CSS

Para el CSS/SCSS, necesitaremos el paquete para preprocesar y el cargador (loader) correspondiente. Además, se encargarán de sacar el CSS que importaremos dentro del `index.js` para enviarlo a un archivo común.

```bash
# Instalación plugin para la extracción del código CSS dentro del `index.js`
npm install -D mini-css-extract-plugin
# Instalación del loader para importar el CSS como si fuesen módulos JS y poder transformarlo
npm install -D css-loader
```
Necesitamos incluir nuestro CSS/SCSS en el inicio del **`./dev/js/index.js`** porque es el punto de partida de webpack. 

```js
import '../css/styles.css';
// código JS
```
Necesitamos:
1. Retirar código CSS para que no figure dentro del JS
2. Crear `./dist/css/styles.css` con el código importado
3. Inyectar el código CSS dentro del HTML con **`<link ...>`**

#### SCSS
Queremos que tb esté preparado para SCSS

```bash
## Instalar preprocesador para Sass desde NodeJs y su loader
npm i -D node-sass sass-loader
```


**`webpack.config.js`**
```js

/* 
Configguración con transpilación a E5 para navegadores no que entiendan E6. 
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  entry: __dirname + '/dev/js/index.js',

  output: {
    path: __dirname + '/dist',
    filename: 'js/main.js' // a partir del output_path
  },

  //para ponerlo por defecto en development
  mode: 'development',

  // //bloque para el BABEL-LOADER loader que realiza la transpilacion
  // module: {
  //   rules: [
  //     {
  //       test: /\.m?js$/,
  //       exclude: /(node_modules|bower_components)/,
  //       loader: 'babel-loader',
  //     }
  //   ]
  // },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: __dirname + '/dev/pages/template.html',
      hash: true,
      templateParameters: {
        titulo: 'Manual de Webpack',
        encabezamiento: ' Aprendo Webpack'
      }
    }),

    new HtmlWebpackPlugin({
      filename: 'nosotros/index.html',
      template: __dirname + '/dev/pages/template.html',
      hash: true,
      templateParameters: {
        titulo: 'Nosotros',
        encabezamiento: 'Soy la pera'
      }
    }),

    new ScriptExtHtmlWebpackPlugin({
      custom: [
        {
          test: /\.js$/,            //configuración para poner el nomodule
          attribute: 'nomodule',
        },
      ]
    }),

    //plugin necesario para la extracción del CSS del index.js
    new MiniCSSExtractPlugin({
      filename: "css/estilos.css", //a partir del output_path
    })
  ],

  //bloque que llama al CSS-LOADER cargador encargado de transformar el CSS
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      }
    ],

    rules: [
      {
        test: /\.scss$/,
        loader: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          'sass-loader'
        ]
      }
    ]


  }

}

```
**`webpack.config-es6.js`**
```js
/* 
Configguración sin transpilación para navegadores que entiendan E6. 
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');


const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  //archivo principal configurado en el package.json
  entry: __dirname +'/dev/js/index.js',

  output: {
    path: __dirname + '/dist', //directorio de salida de los archivos html
    filename: 'js/main-es6.js' //directorio de salida para el js
  },

  mode: 'development',

  plugins: [
    //generación de HTML a partir de plantilla con inyección de scripts para el `./dev/pages/index.html`
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: __dirname + '/dist/index.html', //la plantilla es el html generado anteriormente
      hash: true,
      templateParameters: {
        titulo: 'Manual de Webpack',
        encabezamiento: ' Aprendo Webpack'
      }
    }),

    //lo mismo para `./dev/pages/nosotros/index.html`
    new HtmlWebpackPlugin({
      filename: 'nosotros/index.html',
      template: __dirname + '/dist/nosotros/index.html',
      hash: true,
      templateParameters: {
        titulo: 'Nosotros',
        encabezamiento: 'Soy la pera'
      }
    }),

    //inyección de parámetros en los scripts inyectados
    new ScriptExtHtmlWebpackPlugin({
      module: 'js'                  //configuración para poner el "type=module"
    }),

    //plugin necesario para la extracción del CSS del index.js
    new MiniCSSExtractPlugin({
      filename: "css/estilos.css", //posiblemente no fuese necesario xq ya lo hizo el es5
    })

  ],

  //bloque que llama al CSS-LOADER cargador encargado de transformar el CSS
  module: {
    rules: [
      { 
        test: /\.scss$/, 
        loader: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }  
}
```

En el **`package.json`** podemos añadir unos scripts de interés
```json
{
  "name": "ej05-webpack-babel-html_plugin",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev:es5": "webpack",
    "dev:es6": "webpack --config webpack.config-es6.js",
    "dev": "npm run dev:es5 && npm run dev:es6",
    "prod:es5":"webpack --mode production",
    "prod:es6":"webpack --mode production --config webpack.config-es6.js",
    "prod": "npm run prod:es5 && npm run prod:es6"
  },
  "author": "RamonBL",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.7.4",
    "@babel/preset-env": "^7.7.4",
    "babel-loader": "^8.0.6",
    "html-webpack-plugin": "^3.2.0",
    "script-ext-html-webpack-plugin": "^2.1.4",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
  }
}
```

## Servidor de desarrollo `webpack-dev-server`

```bash
## instalar el servidor de desarrollo. Podría ser interesante usarlo de manera global tb
npm i -D webpack-dev-server
```

Añadimos un script en el `package.json` para iniciarlo en  modo development en el navegador predeterminado con nuestra proyecto

```js
"scripts": {
  ...
  "server:start": "webpack-dev-server --mode development --open"
}  
```
Lo iniciamos desde nuestro proyecto con:

```bash
#Con el script creado
npm server:start

#Con el comando del módulo desde el proyecto
node_modules/.bin/webpack-dev-server --open
```
