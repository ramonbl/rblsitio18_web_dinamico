# Sistemas de módulos.

Trozo de código reutilizable que encapsula los detalles de implementación y expone un API pública que puede ser cargado y usado por otro código de manera sencilla permitiendo:

Abstración de código, encapsulación, reutilización y gestión de dependencias

## 1. Variables globales - Revelación del patrón de módulos


```js

//Módulo miCalculoNotas es una variable global (function(){...})();
var miCalculoNotas = (function () {

  var misNotas = [7, 3, 5];
  
  var media = function () {

    var total = misNotas.reduce(function(accumulator, item){
      return accumulator +item;
    }, 0);

    return 'Tu media es: ' + total / misNotas.length;

  };

  return {
    media: media,
  }

})();


//Uso en MISMO ARCHIVO
miCalculoNotas.media(); //5
```

## 2. CommonJS

**`miModulo.js`**
```js
//Módulo implementado para exportar
function miModulo(){

  this.hola = function(){
    return 'hola!';
  }

  this.adios = function(){
    retur 'adiós!';
  }

}

module.exports = miModulo;
```


**`miPrograma`** usa `miModulo`
```js
var miModulo = require('MiModulo');
var instanciaMiModulo = new miModulo();

instanciaMiModulo.hola(); //hola!

```

## 3. Asynchronous Module Definition

**`miModulo.js`**
```js
define([], function(){

  return {

    hola: function(){
      console.log('hola');
    },

    adios: function(){
      console.log('adios');
    }

  }

})
```

**`miPrograma`** usa `miModulo`
```js
define(['./miModulo', './otroModulo', ...], function (miModulo, otroModulo){
  console.log(miModulo.hola());
});
```

## 4. Universal Module Definition

```js
(
  function (root, factory) {

    // ASYNCRONOUS MODULE DEFINITON
    if (typeof define === 'function' && define.amd) {
      define(
        ['miModulo', 'otroModulo'], 
        factory);
    }

    // COMMONJS
    else if (typeof exports === 'object'){
      module.exports = factory(
        require('miModulo'), 
        require ('otroModulo' )
        );
    }

    // BROWSER GLOBALS
    else {
      root.returnExports = factory(root.MiModule, root.otherModule);
    }

  }(
    this,
    function (miModulo, otroModulo){
      //métodos
      function noHolaAdios(){}; //private
      function hola(){}; //público xq hay return

      return{
        hola: hola
      }
    }
  )
)

```

## 5. ECMAScript 6 (ES6)  <--> BABEL

**`moduloContador`**
```js
export let contador = 1;

export function increment() {
  counter++;
}

export function decrement() {
  counter--;
}

```

**`miPrograma`** usa `moduloContador`
```js
import * as miContador from './moduloContador'; //importa todo como alias miContador

console.log(miContador.contador); //1
miContador.increment();
console.log(miContador.contador); //2

```
