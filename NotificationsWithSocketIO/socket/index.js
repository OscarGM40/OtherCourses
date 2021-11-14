import { Server } from "socket.io";
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

/* user = { 
   username:string,
   socketid:string,
} */

let onlineUsers = [];

// buena lógica para salir del paso
const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers.filter((user) => user.socketId !== socketId);
};

// ojo que JS no tiene findOne como pudiere parecer
//el método me devuelve el User{} a través del unique name
const getUser = (username) => {
 return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  console.log("User connected with id: " + socket.id);

  // cuando se conecte alguien en el cliente ese cliente mandará su conexión aqui,al server
  socket.on("newUser", ( username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification",({ senderName,receiverName,type}) => {
    const receiver = getUser(receiverName);
    console.log(receiver)
    io.to(receiver.socketId).emit("getNotification",{ 
      senderName,
      type,
    })
  })
  // solo tengo que tener user + su id de los activos
  // cuando se desconecte un usuario lo remuevo del arreglo
  socket.on("disconnect", () => {
    console.log("someone has left");
    removeUser(socket.id);
  });
});

io.listen(5000,() => {
  console.clear()
  console.log("Socker Server ready on port 5000")
});
