// Audio es el control Play es el boton
//const audio = document.getElementById("audio");
//const playPause = document.getElementById("play");
/* 
playPause.addEventListener("click", () => {
  if (audio.paused || audio.ended) {
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
    audio.play();
  } else {
    audio.pause();
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
  }
}); */

$(function () {
  //buscamos el html element <audio></audio>
   var audio = $("audio");
  // const audio = document.getElementById("audio");
  function cargarCanciones() {
    $.ajax({
      url: "http://localhost:3000/canciones",
    })
      .done(function (canciones) {
        var lista = $(".lista-canciones"); //referenciamos la UL
        //primero vaciamos la unordered list,despues la llenamos
        lista.empty();
        //recorremos la data,que será el json estatico de momento
        //la data tiene el nombre de canciones y es un array
        //al iterar canciones tenemos un objeto cancion
        canciones.forEach(function (cancion) {
          let nuevoElemento = $(
            '<li class="cancion">' + cancion.nombre + "</li>"
          );
          nuevoElemento.on("click", cancion, play).appendTo(lista);
        });
      })
      .fail(function () {
        alert("No pude cargar las canciones :(");
      });

    function play(evento) {
      const playPause = document.getElementById("play");
      const titulo = document.getElementById("title")
      const listaCanciones = document.querySelectorAll(".cancion");
  /*     listaCanciones.forEach(cancion => {
        if (!cancion.paused && !cancion.textContent.endsWith("Playing...")){
          cancion.textContent += "     " + `Playing...`
          
        }
        else if(cancion.textContent.endsWith("Playing...") || cancion.paused){
          cancion.textContent = evento.data.nombre; 
        }
      })  */
     
      playPause.addEventListener("click", () => {
       
        if (audio[0].paused || audio[0].ended) {
          playPause.querySelector(".pause-btn").classList.toggle("hide");
          playPause.querySelector(".play-btn").classList.toggle("hide");
          titulo.textContent = "Playing"
          audio[0].play();
        } else {
          
          audio[0].pause();
          playPause.querySelector(".pause-btn").classList.toggle("hide");
          playPause.querySelector(".play-btn").classList.toggle("hide");
          titulo.textContent = "Paused"
        }
      });   
      //cuando veamos el array estamos con el elemento nativo(o sea con JS)
      // audio[0].pause(); //<- pausa el primer tag <audio>
      audio.attr("src", "/canciones/" + evento.data.nombre);
      //si es un object es el elemento jquery
       audio[0].play();
       
    }
  }

  cargarCanciones();
});
