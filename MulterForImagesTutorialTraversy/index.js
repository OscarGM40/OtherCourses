
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


// Init our app
const app = express();
// configure the template engine
app.set('view engine','ejs');
// configure the static folder
app.use(express.static('./public'))

//create storage
const storage = multer.diskStorage({
   destination:'./public/uploads/',
   filename:(req,file,cb) => {
      cb(null,file.fieldname+'-'+Date.now()
      +path.extname(file.originalname));
   }
})
//create an instance puede ser el atributo Id o el name del input:file
const upload = multer( { storage:storage,
   limits:{
   fileSize:10000000
   },
   fileFilter: (req,file,cb) => {
      checkFileType(file,cb);
   }
}).single('miImagen');

const checkFileType = (file,cb) => {
   const filetypes = /jpeg|jpg|gif|png/;
   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
   const mimetype = filetypes.test(file.mimetype)
   
   if(mimetype && extname) {
      return cb(null,true)
   } else {
      cb("Error: Images only!")
   }
   
}


//routes,as they return a template I have to create the views folder and files extension must be .ejs
app.get('/', (req, res) => {
   res.render('index')
})

app.post('/upload2',(req, res) => {
   upload(req,res, (err) => {
      if(err) {
         res.render('index',{ msg:err })
      }else {
         if(req.file == undefined) {
            res.render('index',{ msg:"Error: no File Selected" })
            
         }else {
            res.render('index',{ 
               msg:"Image uploaded",
               file:`uploads/${req.file.filename}`
            })
            console.log(req.body,'body')
            console.log(req.file,'file')
         }
      }
   })
});

// start the server
app.listen(3000,() => console.log('Server on port 3000'));

