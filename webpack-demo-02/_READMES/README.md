## Parámetros
--global (-g)
--version (-v)
--save (-S)
--save-dev (-D)
--optional (-O)

## Eliminar plugin global
npm remove -g gulp
npm rm -g gulp

## Ver versiones de los elementos
node -v
npm -v
npmx -v

## Desinstalar paquetes eliminando del paquete `package.json`


```powershell
# desinstalar y eliminar de dependencies
npm uninstall -S PAQUETE
# desisntalar eliminando de dev-dependencies
npm uninstall -D PAQUETE
# desinstalar eliminadnando de optional-dependencies
npm uninstall -O PAQUETE
# desinstalar globalmente
npm uninstall -g PAQUETE
```

## GULP4

```powershell
npm rm -g gulp

# instalar globalmente la línea de comandos de gulp
npm install -g gulp-cli

# crear carpeta de proyecto
mkdir proyecto
cd proyecto

# crear archivo `package.json`
npm init

# instalar paquete en las devDependencies
npm install -S gulp

# comprobar instalación
gulp -v

# crear archivo `gulpfile.js`
touch gulpfile.js
```

`gulpfile.js` de ejemplo
```js
function defaultTask(cb) {
  // place code for your default task here
  cb();
}
exports.default = defaultTask
```

```powershell
# ejecutar la defaultTask
gulp

# instalar babel para evitar problemas de compatibilidad con JS ES2015
npm install --save-dev babel-register babel-preset-es2015

# cambiar el nombre del gulpfile
rename gulpfile.js gulfile.babel.js

# crear archivo para la configuración preset
touch .babelrc
```

`.babelrc`
```txt
{
  "presets": [ "es2015" ],
}
```

**Modificar el archivo `gulpfile.babel.js` para que haga las tareas deseadas


## Conceptos

### Vinyl

Objeto de metadatos que describe a un archivo mediante propiedades como `path` y `contents`

### Vinyl adapters

Necesarios para poder acceder al código de los archivos

Proporciona método `src(globs, [options])` y retorna un  stream que produce un objeto `Vinyl`

Proporciona método `dest(folder, [options])` y devuelve un stream que consume objetos `Vinyl`

Otros métodos para la entrada salida `simlink` (vinyl-fs) ...

### Tareas

Cada tarea es una función asincrónica de JS que acepta una llamada de `primer-error` o retorna un stream, promesa (promise), emisor de eventos (event emitter), proceso secundario (child process) u observable (observable)

### Globs

Un segmento es lo que se encuentra entre dos separadores.

Un separador en un Glob es siempre `/` independientemente del SO (incluso en Windows que sería `\\` en un Glob es simplemente el caracter deescap).

Se usan los caracteres `*`, `**`, `!`

```js
var glob = '!./dir/dir2/**'  // se olvida de todos 
```

#### Glob base

Es el path previo a cualquier caracter especial.
`./dir/dir2` en el caso anterior.

 Todas las rutas que coinciden con el globo, comparten la base del globo

 Las instancias `Vinyl` generadas por `src` se construyen con la base global establecida como su propiedad base.
 Cuando escribimos con `dest`, la base se eliminará de la estructura de salida para preservar la estructura de directoriso

 ```js
 var globParent = require('glob-parent');

globParent('path/to/*.js'); // 'path/to'
globParent('/root/path/to/*.js'); // '/root/path/to'
globParent('/*.js'); // '/'
globParent('*.js'); // '.'
globParent('**/*.js'); // '.'
globParent('path/{to,from}'); // 'path'
globParent('path/!(to|from)'); // 'path'
globParent('path/?(to|from)'); // 'path'
globParent('path/+(to|from)'); // 'path'
globParent('path/*(to|from)'); // 'path'
globParent('path/@(to|from)'); // 'path'
globParent('path/**/*'); // 'path'

// if provided a non-glob path, returns the nearest dir
globParent('path/foo/bar.js'); // 'path/foo'
globParent('path/foo/'); // 'path/foo'
globParent('path/foo'); // 'path' (see issue #3 for details)
 ```

 ### Estados del sistema de archivos
 Los metadatos de un archivo son proporcionados como una instancia `fs.Stats`.
 Está disponible en los objetos Vinyl y sirve para determinar si un objeto representa a un directorio o un link simbólico.
 Cuando se escribe en el sistema de archivos, los permisos y los valores de tiempo se sincronizan desde la propiedad `stat` de los objetos vinyl

 ### Modos del sistema de archivos
 Determina qué permisos existen para un archivo.
 La mayoría de los ficheros del file system tendrán un modo permisivo que permitirá a gulp leer, escribir y actualizar archivos en nuestro nombre. 
 Por defecto, Gulp, crea archivos con los mismos permisos que el proceso de ejecución pero se puede modificar con las opciones.
 Si hay problemas con los permisos (EPERM) hay que verificar los modos en los archivos
 
 ### Módulos
 Gulp está compuesto por múltiples pequeños módulos

 `undertaker` sistema de registro de tareas
 `vinyl` objetos de archivos virtuales
 `vinyl-fs` adaptador para el sistema local
 `glob-watcher` el observador de archivos
 `bach` organización de tareas con `series()` y `parallel()`
 `last-run` controla el último tiempo de ejecución de una tarea
 `vinyl-sourcemap` soporte de mapa fuente
 `gulp-cli` la línea de comando interactiva

 ### Métodos de GULP
 [gulp/docs/api at be5906b5a20b967e4508aa426223cef4dbc1683d · gulpjs/gulp · GitHub](https://github.com/gulpjs/gulp/tree/be5906b5a20b967e4508aa426223cef4dbc1683d/docs/api)

 `src('globs_string', [options_object])`
 `dest()`
 `series()`
 `parallell()`
 `task()`
 `watch()`


### Consola de comandos

`gulp --tasks` muestra tareas en modo árbol
`gulp --tasks-simple` muestra tareas
`gulp --verify` verifica que los plugins referenciados en el `package.json` contra la blacklist
` gulp --color` obliga a usar colores
