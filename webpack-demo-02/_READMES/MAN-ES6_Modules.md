# ES6 Modules

Gracias a E6 podemos usar módulos y organizar mejor nuestro código que permitiremos que sean exportados (alguno de sus miembros) y otros archivos los importarán para hacer uso de ellos.

Los miembros son expuestos con la palabra **`export`** y otros módulos o ficheros pueden importarlos con **`import`**.

Hoy en día, la mayoría de los navegadores ya los usan de manera nativa.

Vamos a ver como usar ES6 modules para exportar e importar cosas entre distintos módulos.


## Usar módulos en HTML

Esto permite que el archivo (`index.js`) importe otros módulos

`type="module"` permite usar ES6 Modules e implementarlo para diversos navegadores

```html
<script src="index.js" type="module"></script>
```

```pug
script(src="index.js" type="module")
```

Algunos navegadores antiguos no lo entenderán y será necesario transpilar con Babel o similares.

Los archivos transpilados a ES5, sin usar módulos se cargarán por medio de:

```html
<script src="código-transpilado.js" nomodule></script>
```
Con lo que, los navegadores modernos entenderán el `nomodule` y no lo usarán ni accederán a él (ahora carga).
Los navegadores antiguos, no lo entenderán por lo que  lo cargarán


### Ejemplo

Se podrían exportar cualquier tipo de miembro: constantes, propiedades, métodos,. ..

**`./modules/pi-module.js`**
```js
export const pi = 3.1416;
```

**`./modules/miModulo.js`**
```js
import {pi} from './pi-module.js';

export value = 2*pi;
```

**`index.js`**
```js
import {value} from ./modules/miModulo.js;
```
