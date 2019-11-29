# Manual de WEbpack.js.org

## webpack-demo-02

Hasta ahora, hemos incluido todos nuestros recursos manualmente en el código.
Si la aplicación crece necesitaremos usar [(hashes en filenames)](https://webpack.js.org/guides/caching) y extraer [(Múltiples Bundles)](https://webpack.js.org/guides/code-splitting)


Vamos a crear varios entry points, cada uno generará un bundle (puede que los necesitemos en partes distintas de la pagina) o que usemos uno y otro no

Generalmente, haremos un `main` y otro en función del tipo de página... (blog, contacto, index...).



**`print.js`**
```js
//creamos un módulo que queremos exportar
export default function printMe() {
  console.log('I get called from print.js!');
}

```

**`index.js`**
```js
/* Importamos librería necesaria para poder leer el `_.join...` */
import _ from 'lodash';

import printMe from './print.js';


// función que crea un elemento `<div>` con un contenido de texto
function component() {
  const element = document.createElement('div');

  const btn = document.createElement('button');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

//Este JS principal, cargamos un div con un contenido (procede de la función anterior) en el documento que lo incorporte (en este caso, el `index.html`)
document.body.appendChild(component());
```


**`webpack.config.js`**
```js
entry: {
  app: './src/index.js',
  print: './src/print.js',
},

output: {
  filename: '[name].bundle.js',
  path: path.resolve(__dirname, 'dist'),
},
```


**`dist/index.html`**
```html
<!doctype html>
<html>
<head>

  <title>Output Management</title>
  <script src="./print.bundle.js"></script>
</head>

<body>
  <script src="./app.bundle.js"></script>
</body>

</html>
```

`npm run build` genera 2 bundles que estarían especificados en partes distintas de nuestro `index.html`

**PROBLEMA: CAMBIO DE NOMBRE O AGREGAMOS UNO**- Se renombrarían en la compilación pero el `index.html` seguiría apuntando a las antiguas referencias (recordar que lo habíamos hecho manualmente)

**NOTA PERSONAL:** Quizás a mí me interese xq prefiera meterlos manualmente en mi motor de plantillas PUG.
Yo la importaría con `file-loader` o algo mejor.

El caso es que podríamos arreglar esto procesando nuestro `index.html` y además, llevándolo a nuestro `src` que es donde debiera estar.

Pero si no queremos copiarlos, que, además con pug tendríamos que compilarlos (¿¿aunque llegaría con compilarlos y copiarlos??)

`npm i -D html-webpack-plugin` por defecto genera un `dist/index.html` a partir del que tengamos en `src/index.html` con los bundles integrados (no me interesa!!!)

**`webpack.config.js`**
```js
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Organización del Output',
    }),
  ],
```
Ver más con: [(HTMLWebpackPlugin)](https://github.com/jantimon/html-webpack-plugin) y [(html-webpack-template)](https://github.com/jaketrent/html-webpack-template) que añade características.

## Limpiar carpeta `dist`(evita el rinraf aunque creo que lo prefiero)

`npm install --save-dev clean-webpack-plugin`

**`webpack.config.js#plugins`**
```js
new CleanWebpackPlugin(),

```
## Manifest

Webpack sabe que archivos están siendo generados gracias al **Manifest** que sigue todo el mapa de módulos a la salida de los bundles.

Ver [(webpack-manifest-plugin)](https://github.com/danethurber/webpack-manifest-plugin)

## mode development en el webpack.config


`**webpack.config#module.exports**`
```js
mode: 'development' ,
```

## Source Maps.

Permiten hacer seguimiento para control de errores.

ex) Si tenemos 3 archivos `.js` que se empaquetan en el mismo `bundle.js` y hay un error, el error apunta al bundle exclusivamente.

Son los Source Maps, nos dirá dónde está el error.

Hay muchas [(opciones)](https://webpack.js.org/configuration/devtool)

`**webpack.config#module.exports**`
```js
devtool: 'inline-source-map',
```
ex) En `print.js` cometemos error `cosnole.log('I get called from print.js!');` en lugar de `console`. 
Abrimos el html en el navegador y vemos que no funciona.
Abrimos el inspector de elementos y vamos a la consola. Allí, aparecerán los errores del JS. Hay que tocar en el elemento que tenga error.

Dará referencia al error.

## Elegir herramienta de desarrollo para seguir el proyecto

Evitar manualmente teclear `npm run build`

- Webpack-Watch Mode
- Webpack-Dev-Server
- Webpack-Dev-middleware

### Watch Mode

Si se actualiza alguna dependencia, el código se recompila automáticamente

**`package.json`**
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
+ "watch": "webpack --watch",
  "build": "webpack"

```
Podemos corregir el error de `console` y guardar y ver como al recargar el navegador, el error está corregido.
Problema: es necesario recargar el navegador.

### Webpack-Dev-Server

`npm i -D webpack-dev-server`

`**webpack.config#module.exports**`
```js
devServer: {
  contentBase: './dist',
  port: 9000,
},
```

Que le dice que sirva los archivos de `dist` en el puerto **8080** por defecto. 

No escribe archivos de salida después de la compilación pero mantiene los archivos de paquete en la memoria y los sirve como si fueran reales montados en la ruta raíz del servidor.
Si la página espera encontrar los archivos de paquete en una ruta diferente, puede cambiarse con la opción **publicPath** en la configuración del servidor de desarrollo.

```json
scripts: {"start": "webpack-dev-server --open",}
```

**[(publicPath)](https://webpack.js.org/configuration/dev-server/#devserverpublicpath-):**

Especifica la ruta base para todos los assets (recursos estáticos) dentro de la aplicación

Lugar de los bundles respecto la salida (generalmente .dist).

Cada archivo emitido a su directorio `output.path` será referenciado desde la ubicación `output.publicPath` (incluyendo división de código, imágenes, fuentes que formen parte de su gráfico de dependencia).

- En desarrollo podríamos tener una carpeta `assets/` al mismo nivel de nuestra página de inicio. Es correcto pero que pasaría si quisiéramos alojar todos estos activos estáticos en un CDN en producción?.


Normalmente los tendré en `dist/js` siendo la salida `dist`. 
-> `publicPath: '/js/'` o `http://localhost:8080/js/`. Por ahora no los tenemos pero lo habitual es que los tenga ahí. 

.

¿¿Habría que añadir publicPath a los recursos que carguemos (css, html,...)?? ¿para el css: publicPath: `'../css/'`??

Lo arrancamos con `npm run start` e iremos viendo los cambios en la pantalla

[(Ver más)](https://webpack.js.org/configuration/dev-server)

[(Probar el Hot Module Replacement)](https://webpack.js.org/guides/hot-module-replacement)


### Webpack-dev-middleware

Es parte del Dev-server pero éste tiene más customización . [(WP-dev-middleware)](https://webpack.js.org/guides/development/#using-webpack-dev-middleware)

## Code Splitting

División de paquetes puede ser muy interesante para priorizar la carga de paquetes que podrían ser cargados bajo demanda o en paralelo.

Podemos enfocarlo de 3 formas:

- Entry Points: Hacelo manualmente usando la configuración de `entry`
- SplitChunksPlugin: deducir y dividir trozos previniendo la duplicación.
- Dinamic Imports: El código dividido a través de llamdas dentro de los propios módulos.

### Entry Points
La más sencilla e intuitiva

Añadimos un `src/another-module.js` y le hacemos un `entry` en `webpack.config.js`. 

Notar que en `index.js` y en `another-module.js` hemos cargado `lodash` lo que es un problema porque lo tendremos en ambos bundles y no mola.


### PreventDuplication
Sería exactamente lo mismo pero haríamos una optimización en el `webpack.config.js`. 

`**webpack.config#module.exports**`
```js
optimization: {
  splitChunks: {
    chunks: 'all',
  },
},
```

Al hacer el build, tendremos nuestros bundles + 1 correspondiente al `lodash` que llama: `vendors~....js`

Existen otros cargadores y plugins de la comunidad que dividen código:

- [(mini-css-extract-plugin)](https://webpack.js.org/plugins/mini-css-extract-plugin) que divide CSS de la aplicación principal.

- [(Bundle-loader)](https://webpack.js.org/loaders/bundle-loader) que divide y carga de forma diferida los paquetes. 

- [(Promise-loader)](https://github.com/gaearon/promise-loader) lo mismo pero usando `Promises` . 

### Dynamic Imports (moito pa min)

[(Dinamic Imports)](https://webpack.js.org/guides/code-splitting/#dynamic-imports)