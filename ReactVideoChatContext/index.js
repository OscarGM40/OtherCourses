
const app = require('express')();
const server =require('http').createServer(app);
const cors = require('cors')
const io = require('socket.io')(server,{
   cors:{
      origin:'*',
      methods:['GET', 'POST'],
   }
})

app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req,res) => {
   res.send("Server is running")
})

io.on('connection', (socket) => {

   // realmente no hace falta emitir a toda la sala,solo al socket que lo pida
   socket.emit('me',socket.id);
   // diria que lo puedo hacer con el id de mongo que nunca cambiará!

   
   /* Un cliente emitirá el evento callUser(cuando??)con este objeto data={
      userToCall:id al que llamar
      signalData:la señal peer
      from: id del que llama
      name:el name de ??
   } Cuando lo recibe el server lo emite de vuelta SÓLO al user que queremos,que lógicamente es al que llamo.Le paso todo de vuelta menos el id,ya que es el suyo y no es necesario Fijate que lo emite automáticamente*/
   socket.on("callUser", ({ userToCall,signalData,from,name }) => {
      io.to(userToCall).emit("callUser",{
         signal:signalData,
         from,
         name
      })
   })
   
   // cuando un cliente emita el evento answerCall le paso a data.to la señal en el evento callAccepted(no lo habia pasado ya arriba??)
   socket.on("answerCall",(data) => {
      io.to(data.to).emit("callAccepted",data.signal)
   })
   // si el socket se desconectara emito a todos menos a mi el evento calleneded
   socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded")
   })
   
})


server.listen(PORT, () => {
   console.clear();
   console.log("Server listening on port "+PORT)
})