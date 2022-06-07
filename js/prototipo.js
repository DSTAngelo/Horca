let palabra = "";
let errores = 0;
let aciertos = 0;
let vidas = 5;

const contar = span("contador");
const imagen = span("imagenAhorcado");
let botonJugar = document.getElementById("jugar");
botonJugar.addEventListener("click", comenzar);
console.log(botonJugar);

const botones_teclado = document.querySelectorAll("#teclado button");
for (let i = 0; i < botones_teclado.length; i++) {
  botones_teclado[i].addEventListener("click", comprobar_botones);
}

// Inicio de funciones para habilitar y deshabilitar los botones primera vez
/*
function manejarTituloInicio() {
  span("palabra_adivinar").style.position = "relative";
  span("palabra_adivinar").style.top = "35px";
}*/

function manejarTitulo() {
  span("contador").style.display = "none";
  span("palabra_adivinar").style.position = "relative";
  span("palabra_adivinar").style.top = "20px";
  span("palabra_adivinar").style.fontSize = "30px";
  Inicio_de_Parametros();
  
}

function InicioTeclados() {
  span("imagenPerdedor").style.display = "none";
  span("imagenGanador").style.display = "none";
  span("imagenAhorcado").style.display = "flex"; //mostrar imagen ahorcado
  const botones_teclado = document.querySelectorAll("#teclado button");
  const botones_jugar = document.querySelector("#jugar");
  for (let i = 0; i < botones_teclado.length; i++) {
    botones_teclado[i].disabled = false;
    botones_teclado[i].style.display = "block";
  }
  botones_jugar.disabled = true;
  botones_jugar.style.display = "none";
}

// FUNCION INICIAR JUEGO

function comenzar() {
  cargaDePalabras();
  InicioTeclados();
  span("contador").style.display = "flex";
  //manejarTituloInicio();
  imagen.src = "../img/original_2.png";
  imagen.style.backgroundPosition = -1500 + "px 0";
  aciertos = 0;
  errores = 0;
  const espaciados = span("palabra_adivinar");
  espaciados.innerHTML = "";
  palabra = palabra_Buscar;
  console.log(palabra.length);
  const espacios = palabra.length;
  for (let i = 0; i < espacios; i++) {
    espaciados.innerHTML += "<span id='letra" + i + "'></span>";
  }
  autoplayer();
}

// FUNCION COMPROBAR BOTONES

function comprobar_botones(event) {
  const botones_teclado = event.target;
  botones_teclado.disabled = true;

  const letra = this.innerHTML;
  let verificador = false;

  for (let i = 0; i < palabra.length; i++) {
    if (letra == palabra[i]) {
      span("letra" + i).innerHTML = letra;
      aciertos++;
      verificador = true;
      console.log("aciertos: " + aciertos);
    }

    if (aciertos == palabra.length) {
      console.log(palabra);
      span("imagenAhorcado").style.display = "none";
      span("imagenGanador").style.display = "block"; //mostrar imagen ganador
      span("palabra_adivinar").innerHTML = palabra;
      span("contador").style.display = "none"; //ocultar contador
      //manejarTitulo();
      Inicio_de_Parametros();
      contar.innerHTML = vidas;
    }
  }
  if (verificador == false) {
    errores++;
    span("imagenAhorcado").style.backgroundPosition = -(300 * errores) + "px 0";
    console.log("errores: " + errores);
    contar.innerHTML = vidas - errores;
    console.log("Vidas: " + (vidas - errores));

    

    if (errores == 5) {
      span("imagenAhorcado").style.display = "none";
      span("imagenPerdedor").style.display = "block"; //mostrar imagen perdedor
      span("palabra_adivinar").innerHTML = palabra;
      span("contador").style.display = "none"; //ocultar contador
      contar.innerHTML = vidas;
     // manejarTitulo();
      Inicio_de_Parametros();
      silenciar();
      
    }
  }
}

// FUNCION GETELEMENTBYID SPAN

function span(x) {
  return document.getElementById(x);
}

// FUNCION IMPRIMIR TEXTO

function imprimir(frase) {
  document.write(frase);
}
/*----------------MANEJO DE AUDIO --------------------------------------*/

function autoplayer() {
  var sound = new Howl({
    src: ["../audio/terror.mp3"],
    volume: 0.1,
    onend: function () {
      
    },
  });
  sound.play();
}


function silenciar() {
  var sound = new Howl({
    src: ["../audio/terror.mp3"],
    volume: 0.0,
  });
  sound.pause();
}

//----------------------------------------------------------------

function cargaDePalabras(x) {
  const listado = [
    "CASA",
    "PERRO",
    "GATO",
    "ELEFANTE",
    "GALLINA",
    "VACA",
    "LORO",
    "CABALLO",
    "CERDO",
    "CONEJO",
  ];

  palabra_Buscar = listado[Math.floor(Math.random() * listado.length)];
  console.log(listado);
  console.log(palabra_Buscar);

  if (x == palabra_Buscar) {
    console.log(x);
    palabra_Buscar = [Math.floor(Math.random() * listado.length)];
  }
  return x;
}

// FUNCION CARGAR PARAMETROS -----------------------------------------//

function Inicio_de_Parametros() {
  span("contador").style.display = "flex";

  vidas = 5;
  errores = 0;
  aciertos = 0;

  const botones_teclado = document.querySelectorAll("#teclado button");
  const botones_jugar = document.querySelector("#jugar");

  for (let i = 0; i < botones_teclado.length; i++) {
    botones_teclado[i].disabled = true;
    botones_teclado[i].style.display = "none";
  }
  botones_jugar.disabled = false;
  botones_jugar.style.display = "block";
}

// ------------------FUNCION INICIAR JUEGO------------------------------ //

function activacionInicial() {
  Inicio_de_Parametros();
}
window.onload = activacionInicial;
