/* Importamos librería necesaria para poder leer el `_.join...` */
import _ from 'lodash'; //es un node_modulo que habíamos instalado

import printMe from './print.js';

import Icon from './icon.png';

import HTML from './ejemplo.html';


// función que crea un elemento `<div>` con un contenido de texto
function component() {
  const element = document.createElement('div');
  
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const myIcon = new Image();
  myIcon.src = Icon
  
  element.appendChild(myIcon);

  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}


//Este JS principal, cargamos un div con un contenido (procede de la función anterior) en el documento que lo incorporte (en este caso, el `index.html`)
document.body.appendChild(component());

