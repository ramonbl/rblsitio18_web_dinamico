/* Importamos librería necesaria para poder leer el `_.join...` */
import _ from 'lodash';

import './style.css';

import Icon from './icon.png';

import Data from './data.xml';

import data from './data.json';



// función que crea un elemento `<div>` con un contenido de texto
function component() {
  const element = document.createElement('div');


  // Es necesaria la librería lodash para que funcione esta línea. Necesitamos cargarlo de alguna manera en nuestro index.html
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  //Icon será un hash del elemento
  const myIcon = new Image();
  //la ruta será una hash que se sabrá que es local
  myIcon.src = Icon

  element.appendChild(myIcon);


  console.log(Data);

  return element;
}


//Este JS principal, cargamos un div con un contenido (procede de la función anterior) en el documento que lo incorporte (en este caso, el `index.html`)
document.body.appendChild(component());