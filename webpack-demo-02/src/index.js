
//IMPORTACIONES
//--------------

//FIREBASE
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
// //configuración Firebase
// import './js/config'

//SCSS
import styles from './scss/main.scss'

//IMGS
// import pngLogo from './img/logo.png'

//TPLs
import tplHome from './views/home.tpl.html'
import tplAbout from './views/about.tpl.html';
import tplContact from './views/contact.tpl.html'
import tplAdmin from './views/admin.tpl.html'
import tplAdminAuthHome from './views/admin_auth.tpl.html'


const d = document,
 main = d.querySelector('.Main'),
 footerYear = d.querySelector('.Footer-year')

footerYear.textContent = new Date().getFullYear();

d.addEventListener('DOMContentLoaded', e => {
  main.innerHTML = tplHome;
})
















/*          # PROYECTO ANTERIOR          
DESCRIPCIÓN: */


//IMPORTACIÓN DE NODE_MODULES 
// (-)import _ from 'lodash'; //para poder leer `_.join...`

//IMPORTACIÓN DE MÓDULOS
// import printMe from './js/modules/print.js';
// import { module01 } from './js/modules/module01.js';

//IMPORTACIÓN HTML
// import index from './views/index.html'

//IMPORTACIÓN SCSS
// import main from './scss/main.scss'

//IMPORTACIÓN IMÁGENES
// import Icon from './assets/img/icon.png';
// import Icon2 from './assets/img/icon2.png';
// import Icon1_blog from './assets/img/blog/icon1-blog.png';


//FUNCIONES
//-----------

//FUNCIÓN component(): crea un elemento `<div>` con un contenido de texto
// function component() {
//   const element = document.createElement('div');
 
//   const h2 = document.createElement('h2');
//   h2.innerHTML = _.join(['Sección generada en JS en el index.js']);
//   h2.classList.add('hello');
//   element.appendChild(h2);

//   const p = document.createElement('p');
//   p.innerHTML = _.join(['Esto es un párrafo generado en index.js']);
//   p.classList.add('hello');
//   element.appendChild(p);

//   const myIcon = new Image();
//   myIcon.src = Icon
//   element.appendChild(myIcon);

//   const btn = document.createElement('button');
//   btn.innerHTML = 'Click me y chequea la consola2!';
//   btn.onclick = printMe;

//   element.appendChild(btn);

//   return element;
// }

//FUNCIÓN MiValidateEmail(correo)
// function miValidateEmail(correo){
//   let validado = module01.validateEmail(correo);
//   console.log(validado);
//   if (validado===true) {
//     return "El email es correcto";
//   }
//   else return "El email no es correcto";
// }

//OUPUT
//-----------
// console.log(module01.pi);  //3.14
// console.log(module01.e);  //2.71828
// console.log(module01.log2);  //0.301029995663981

//Este JS principal, cargamos un div con un contenido (procede de la función anterior) en el documento que lo incorporte (en este caso, el `index.html`)
// (-) document.getElementById('main').appendChild(component());

