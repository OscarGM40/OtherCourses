const express = require('express');
let app = express();

let path = require('path');
let fs = require('fs');
let mediaserver = require('mediaserver');
var multer = require('multer');

var opcionesMulter= multer.diskStorage({
   destination:function(req,file,cb){
      cb(null,path.join(__dirname,'canciones'))
   },
   filename:function(req,file,cb){
      cb(null,file.originalname)
      
   },
})

var upload = multer({
   storage:opcionesMulter
})

app.use(express.static('public'));
//cuando se pida algo a '/jquery' lo mandas como estatico(a express)
app.use('/jquery',express.static(path.join(__dirname,'node_modules','jquery','dist')));



//esta ruta servira las canciones.Hay que usar el modulo fileSystem y parsear el envio
app.get('/canciones',(req, res) => {
   fs.readFile(path.join(__dirname,'canciones.json'),'utf8',function(err, canciones){
      if(err) throw new Error;
      res.json(JSON.parse(canciones))
   });
})

//esta ruta tendra un parametro dinamico con el nombre de la cancion
//con el doble punto el servidor lo captura como una variable-> :nombre
app.get('/canciones/:nombre', (req, res) => {
   //lo primero es almacenar la cancion
   let cancion =path.join(__dirname,'canciones',req.params.nombre)
 //  console.log(req.params.nombre)
   //hacer un pipe significa comunicarlo,pasarlo,redirigirlo al browser
   //tendra tres parametros-req-res- y lo que se envia
   mediaserver.pipe(req,res,cancion);

})

//Esta es la unica vista para el usuario
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname,'index.html'))
})

//multer va aestar pendiente de un unico archivo,que viene en el campo con name=cancion(el que esté en el input del HTML)
app.post("/canciones", upload.single('cancion') ,(req, res) => {
//en la req.file.originalname tendremos el nombre de la cancion (abc.mp3) 
   var nombre = req.file.originalname;
   //fijate como leemos el archivo json con el modulo filesystem
   fs.readFile(path.join(__dirname,'canciones.json'),'utf8',function(err,archivo){
      if(err) throw err;
      //vendra en json asi que hay que pasarlo a object y quitarle las comillas
      var canciones = JSON.parse(archivo);
      //le hacemos un push con un objeto con el nombre igual al nombre original
      let existe = canciones.find(cancion => cancion.nombre === nombre)
      if(!existe){
      canciones.push({
         nombre:nombre,
      })};
     
      fs.writeFile(path.join(__dirname,'canciones.json'),JSON.stringify(canciones),function(err){
         if(err) throw err;
      })
      //una vez guardaoa la nueva cancion vamos a refrescar la pagina index.html
      res.sendFile(path.join(__dirname,'index.html'))
   });
})



app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'))

