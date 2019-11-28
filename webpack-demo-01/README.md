# Manual de WEbpack.js.org

Webpack empaquetará el proyecto a partir del `./src/app.js`.
Necesitaremos insertar allí todo lo que necesitemos.
Webpack construirá un gráfico de dependencia a partir del `app` y sus importaciones.


**Lodash:** Librería JS para manejar objetos.
Como la necesitamos: `npm i --S lodash`


## Ejecución webpack

`npx webpack` //ejecuta un binario en ./node_modules/.bin/webpack
El resultadoes es generar el **bundle** `dist/main.js` con el código de todas las dependencias (`index.js` y su dependencia `lodash`).

Si abrimos el `index.html` veremos el resultado de la integración del script.

- **IMPORT/EXPORT** se estandarizón en ES2015 (ES6) y muchos navegadores no lo entienden pero webpack sí lo hace.
  Además, webpack transpila el código relacionado con los IMPORT/EXPORT para que los navegadores puedan verlo pero no el resto.
  Si en nuestro código usamos ES6, necesitaremos transpilarlo con **Babel**.

## Creación del `webpack.config.js`

Si el código es complejo, conviene hacer el archivo de configuración.

Si está presente, `npx webpack` lo aplica.

`npx webpack` &equiv; `npx webpack --config webpack.config.js`

## Creación de scripts en `package.json`
Muy interesantes para usar rápidamente

```json
"build": "webpack" // podremos usar con: `npm run build`
```

## Manejar CSS 

WEbpack puede manejar todas las dependencias incluidas assets (recursos) y moverlas a la carpeta de distribución.

```bash
npm i -D css-loader style-loader  # carga de un CSS al Bundle y lo importa en el html. Tenemos que explicitarlo en el `index.js`
```
Necesitamos `import` el archivo en nuestro `index.js` y hacemos el `build`

**`webpack-config.js#rules[...]`]
```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ],
},
```

La web incorpora el nuevo CSS  a través del JS (está integrado en el bundle).

Más adelante veremos como extraerlo en archivos si es lo que queremos (`minimize-css`, `postcss`, `sass`)

## Manejar Imágenes, iconos, backgrounds,... 



### File-loader

```bash
npm i -D file-loader
```

Resuelve un `import`/`require()` sobre un archivo en una URL local (mapeada) y emite un archivo al directorio de salida.


### Práctica
Necesitaremos importarlos tb al js `import Icon form '.icon.png` en nuestro `index.js`

Aprovechamos y lo usamos de `background` en el css

`npm run build`

Se sube un archivo `./dist/<hash_del_png>.png` demostrando que webpack encontró la imagen.
 `Icon` será un hash, y `MyIcon` llevará a un archivo local.

**`webpack-config.js#rules[...]`]
```js
{
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    'file-loader',
  ],
},
```

css-loader y el html-loader(nativo) manejarán esta situación por nosotros

Más adelante será interesante usar `url-loader` y `image-webpack-loader`

## Manejar Fonts

**`webpack-config.js#rules[...]`]
```js
{
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    'file-loader',
  ],
},
```
La podemos incorporar a nuestro CSS y darle un nombre cualquiera como `MyFont`

Más adelante: [(No Title)](https://survivejs.com/webpack/loading/fonts/)

## cargar datos : csv, xml, json

Json se importa como en Node `import JsonData from './data.json'`
Para los otros hay que añadir cargadores

`npm i -D csv-loader xml-loader`

**`webpack-config.js#rules[...]`]
```js
{
  test: /\.(csv|tsv)$/,
  use: [
    'csv-loader',
  ],
},
{
  test: /\.xml$/,
  use: [
    'xml-loader',
  ],
},
```

Importamos en el `index.js`: 
`import Data from './data.xml';`
`import data from './data.json';`

Serán incorporados al `bundle.js`

**NOTA:** CAMBIAR LA MANERA DE ESTRUCTURAR PUEDE SER INTERESANTE PARA AUMENTAR LA PORTABILIDAD

Permitirá copiar componentes de un proyecto a otro con facilidad.

```bash
src
  assets
    index.jsx
    index.css
    icon.svg
    img.png
```
lo llevaríamos a:

```bash
src
  components
    my-component
      index.js
      index.css
      icon.svg
      img.png

```