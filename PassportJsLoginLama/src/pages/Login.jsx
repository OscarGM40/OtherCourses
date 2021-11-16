import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";

const Login = () => {

   const googleLogin = () => {
      window.open('http://localhost:5000/auth/google', '_self');
   }
   
   const githubLogin = () => {
      window.open('http://localhost:5000/auth/github', '_self');
   }

   const facebookLogin = () => {
      window.open('http://localhost:5000/auth/facebook', '_self');
   }

   return (
      <div className="login">
         <h1 className="login__title">Choose a Login Method</h1>
         <div className="login__wrapper">

            <div className="login__left">

               <div className="login__button google"
                  onClick={googleLogin}
               >
                  <img src={Google} alt="" className="login__icon" />
                  Google
               </div>
               <div className="login__button facebook"
                  onClick={facebookLogin}>
                  <img src={Facebook} alt="" className="login__icon" />
                  Facebook
               </div>
               <div className="login__button github"
                  onClick={githubLogin}>
                  <img src={Github} alt="" className="login__icon" />
                  Github
               </div>
            </div>

            <div className="login__center">
               <div className="login__line"></div>
               <div className="login__or">OR</div>
            </div>
            {/*  Fin parte izquierda*/}

            <div className="login__right">
               <input type="text" placeholder="Username" className="login__input" />
               <input type="text" placeholder="Password" className="login__input" />
               <button className="login__submit">Login</button>
            </div>
         </div>
      </div >
   )
}

export default Login
