const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  // el server emite el evento "me" que devuelve el socket.id al que lo pida desde el cliente
//   console.log("hola");
  socket.emit("me", socket.id);

  // cuando se va un usuario transmite a todos automáticamente el evento callEnded
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  //el server esta escuchando por este evento.El que lo pida le manda el evento callUser
  socket.on("callUser", (data) => {
    // io.to() debia recibir un socket.id obligatoriamente?? o puede ser cualquier id.

    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  // cuando llamen hay que contestar
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

});

server.listen(5000, () => {
  console.clear();
  console.log("Server on port 5000");
});
