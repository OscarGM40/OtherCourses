const express = require('express');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));


// FAKE DATA
const users = [
   {
      id:'1',
      username:'john',
      password:'123456',
      isAdmin: true
   },
   {
      id:'2',
      username:'jane',
      password:'123456',
      isAdmin: false
   }
]

let refreshTokens = []


app.post('/api/refresh', (req,res) => {
   //take the refresh token from the user
   const refreshToken = req.body.token 
   
   //send error if there is no token or it's invalid
   if(!refreshToken) return res.status(401).json("You are not authenticated")
   if(!refreshTokens.includes(refreshToken)){
      return res.status(403).json("Refresh token is not valid")
   }
   //si en el body viene un token que ya tengo almacenado

   jwt.verify(refreshToken,"refreshkey", (err,user) => {
      err && console.log(err);

      // si pasa la verificacion(luego es el mismo token)
      // lo invalido eliminandolo del array de tokens filtrando por todos los que no sean ese token
      refreshTokens = refreshTokens.filter(token => token != refreshToken);
      
      // creo ambos tokens de nuevo
      const newAccessToken = generateAccessToken(user)
      const newRefreshToken = generateAccessToken(user)

      refreshTokens.push(newRefreshToken);

      res.status(200).json({
         accessToken: newAccessToken,
         refreshToken: newRefreshToken
      })
      
   })

   
})

const generateAccessToken = (user) => {
   return jwt.sign({ id:user.id, isAdmin:user.isAdmin },
      "secretone",
      { expiresIn:"15s" })
}

const generateRefreshToken = (user) => {
   return jwt.sign({ id:user.id, isAdmin:user.isAdmin },
      "refreshkey")
}


app.post('/api/login', (req,res) => {
   const { username, password } = req.body;
   const user = users.find( u => {
      return u.username === username.trim() && u.password === password;
   }) // user es true si hay un username y password en la fakeData
   
   if(user){
      // Si uso refresh tokens genero dos ya desde la primera vez,pero solo devuelvo el Access Token al user.  
      //Generate an access token
      const accessToken = generateAccessToken(user)
      //generate a refresh token with other secret
      const refreshToken = generateRefreshToken(user);
      //persisto el primer refreshtoken
      refreshTokens.push(refreshToken);

      res.json({
         userId: user.id,
         username:user.username,
         isAdmin:user.isAdmin,
         accessToken,
         refreshToken
      })

   }else{
      res.status(400).json("Bad credentials")
   }
})



const verifyToken = (req,res,next) => {
   //el cliente debe fijar en los headers la authorizarion con el token válido
   const authHeader = req.headers.authorization;
   if(authHeader){
      const token = authHeader.split(" ")[1];
      jwt.verify(token,"secretone",(error,user) => {
         if(error){
            console.log(token)
            return res.status(403).json("Token is not valid")
         } 
         req.user = user;
         next();
      })
   }else {
      res.status(401).json("Not authenticated.You must provide a token")
   }
}

app.delete("/api/users/:userId",verifyToken,(req,res) => {
   if(req.user.id === req.params.userId || req.user.isAdmin){
      res.status(200).json("User has been deleted")
   } else {
      res.status(403).json("You are not allowed to delete this user")
   }
})

app.get('/api/get', verifyToken , (req, res) =>{
   res.send("hello")
})
app.post('/api/logout',verifyToken, (req,res) => {
   const refreshToken = req.body.token;

   refreshTokens.filter(token => token !==refreshToken)
   res.status(200).json("You logged out succesfully")
})


app.listen(5000, () => {
   console.log('Backend JWT en puerto 5000')
})