const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 4400

app.use(express.json())
app.use(cors())
app.use("/images", express.static(path.join(__dirname,"resources/images")))
app.use("/videos", express.static(path.join(__dirname,"resources/videos")))


app.get('/', (req, res) => { 
    res.send('Hello People'); 
});

const imageStorage = multer.diskStorage({
    destination: (req,file,cb) => {
       cb(null,'resources/images')
      }, 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const videoStorage = multer.diskStorage({
     destination: 'resources/videos', // Destination to store video 
     filename: (req, file, cb) => {
         cb(null, file.fieldname + '_' + Date.now() 
          + path.extname(file.originalname))
     }
});

const imageUpload = multer({
      storage: imageStorage,
      limits: {
        fileSize: 4000000 // 1000000 Bytes = 1 MB
      },
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
           // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    }
}) 
const videoUpload = multer({
     storage: videoStorage,
     limits: {
     fileSize: 20000000 // 10000000 Bytes = 10 MB dejo 20MB
     },
     fileFilter(req, file, cb) {
       // upload only mp4 and mkv format
       if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
          return cb(new Error('Please upload a video'))
       }
       cb(undefined, true)
    }
})
// NOTA para una imagen, la key es 'image'
app.post('/uploadimage', imageUpload.single('image'), (req, res) => {
  res.send(req.file)
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

// [ ] para multiples imagenes,la key es 'images'
app.post('/uploadimages', imageUpload.array('images', 4),     (req, res) => {
  res.send(req.files)
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})
// [ ] para video
app.post('/uploadvideo', videoUpload.single('video'), (req, res) => {
   res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})




app.listen(port, () => {
    console.log('Server is up on port ' + port);
})