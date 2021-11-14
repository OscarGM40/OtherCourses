
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())

// simplemente va a devolver lo que le mande yo por la request tras 2 segundos
app.post("/api/users/:id/update", function (req, res) {
   setTimeout(function () {
      res.send(req.body)
   },2000)
})

app.listen(8800, ()=>{
   console.clear()
   console.log("Backend server on port 8800")
})