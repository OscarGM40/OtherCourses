import { Button, TextField } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({onSignIn}) => {

  const navigate = useNavigate();
  const [username , setUsername  ] = useState('');
  const [password , setPassword] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      navigate("/");
      onSignIn();
    } catch (error) {
      console.log("error loggin in of type:",error)  
    }
  }
  
  return (
  <div className="signin">
    <h2>Sign In Form</h2>

    <TextField 
      id='username'
      label="Username"
      value={username}
      onChange={e => setUsername(e.target.value)}
    />
    <TextField 
      id='password'
      label="Password"
      type="password"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />

    <Button
       id="signInButton"
       color="primary"
       variant="contained"
       onClick={handleSubmit}
      >Sign In</Button>

  </div>
  );
};

export default SignIn;
