import { useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';


function App() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // console.log(' renderizado ')

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(username,password);
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
       console.log(error.response.data);
    }
  };

  // procura hacer esto con useRefs
  // hay que esperar un poco para que fije el estado
  localStorage.setItem("tempUser",JSON.stringify(user));

  const handleDelete = async (e) => {
    try {
      await axiosJWT.delete(`http://localhost:5000/api/users/${user.userId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
      });
      // console.log(res.data);
      setUser(null);
      localStorage.removeItem("tempUser");
    } catch (error) {
      console.log(error?.response.data);
      // console.log(error);
    }
  };

  const refreshToken = async (req,res) => {
    try {
      //para refrescar el token mando el refreh toke por el body
      // con la propiedad token en este caso
      //recuerda que esta peticion me devuelve dos tokens nuevos
        const res = await axios.get(`http://localhost:5000/api/refresh`,{
            token:user.refreshToken
        })      
        setUser({
          ...user,
          accessToken:res.data.accessToken,
          refreshToken:res.data.refreshToken
        });
        return res.data

    } catch (error) {
      console.log(error)
      // console.log(error?.response.data)
    }
  }

  //no tengo porque trabajar con la instancia común de axios
  //puedo crearme cuantas quiera con axios.create()
  const axiosJWT = axios.create()
  
  
    axiosJWT.interceptors.request.use( async (config) => {
      let currentDate = new Date();
      let decodedToken = jwt_decode(user.accessToken)
      console.log(decodedToken)
      //paso a segundos la exp date.Cuando el user haga una peticion y el token haya expirado(su tiempo es menor que el actual) se refrescaran los tokens
      if(decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken()
        // refreshToken() me devuelve ambos tokens!
        // intercepto los headers y actualizo el accesstoken
        config.headers["authorization"] ="Bearer "+data.data.accessToken;
      }
      //ya puedo devolver la config
      return config;
      //ojo que puede haber errores y debo cancelar mi promesa
    },(error) => Promise.reject(error))  
  
  

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <br />
        <div className="">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername((e.target.value))}
          />
        </div>
        <br />
        <div className="">
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Send value</button>
      </form>
      <br /> <br /> <br /><br />
      <br />
      <button type="button" onClick={handleDelete}>
        Delete user
      </button>
      <br /><br /><br />
      {user && <h1>{user.isAdmin ? "Bienvenido Admin" : "Bienvenido User"}</h1>}
      {! user && <h1>Log in Please</h1>}
    </div>
  );
}

export default App;
