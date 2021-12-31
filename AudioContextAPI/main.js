let source = null;
let context = null;
let gainNode = null;

/* le doy una url con un sonido y lo carga en el buffer */
async function loadSound(url) {
  context && context.close();
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  gainNode = context.createGain();

  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  source = context.createBufferSource(); // creates a sound source

  request.onloadend = function () {
    context.decodeAudioData(request.response, function (buffer) {
      source.buffer = buffer; // tell the source which sound to play
      source.connect(gainNode);
      gainNode.connect(context.destination); // connect the source to the context's destination (the speakers)
      // source.connect(context.destination); // speakers

      /* si no existen las creo */
      if (!source.start) {
        source.start = source.noteOn;
      }
      if (!source.stop) {
        source.stop = source.noteOff;
      }
      return source;
    });
  };
  request.send();

  return {
    context,
    source,
    gainNode
  }

}

// loadSound("//katiebaca.com/tutorial/odd-look.mp3");

let audioTag = document.getElementById("sound");
let buttonAudioOne = document.getElementById("audio1");
let buttonAudioTwo = document.getElementById("audio2");
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let pause = document.getElementById("pause");
let unpause = document.getElementById("unpause");
let range = document.getElementById("range");

// source = context.createMediaElementSource(audioTag);
// source.connect(context.destination);

buttonAudioOne.addEventListener("click", function () {
  // context && context.close();
  loadSound("//katiebaca.com/tutorial/odd-look.mp3")
  .then( (data) => {
    console.log(data);//tengo acceso a todo ya
    //  source.start(0);
    // gainNode.gain.value = 0.5; 
  });
});

buttonAudioTwo.addEventListener("click", function () {
  // context && context.close();
  loadSound("//katiebaca.com/tutorial/odd-look.mp3");
});

start.addEventListener("click", function () {
 source.start && source.start(0); //solo se puede darle una vez
 const interval = setInterval(() => {
   console.log(source.buffer.duration);
   console.log(context.currentTime);
   console.log(Boolean(source.start))

 }, 5000);

});

stop.addEventListener("click", function () {
  source.stop(0); //solo se puede darle una vez
});

pause.addEventListener("click", function () {
  context.suspend(); //stop hace que haya que cargar el sonido
});

unpause.addEventListener("click", function () {
  context.resume();
});

range.addEventListener("change", function () {

  var fraction = parseInt(range.value) / 100;

  if (gainNode) {
    gainNode.gain.value = fraction * fraction;
  }
});

