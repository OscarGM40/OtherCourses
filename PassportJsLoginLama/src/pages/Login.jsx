import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";

const Login = () => {
   return (
      <div className="login">
         <h1 className="login__title">Choose a Login Method</h1>
         <div className="login__wrapper">

            <div className="login__left">

               <div className="login__button google">
                  <img src={Google} alt="" className="login__icon" />
                  Google
               </div>
               <div className="login__button facebook">
                  <img src={Facebook} alt="" className="login__icon" />
                  Facebook
               </div>
               <div className="login__button github">
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
               <input type="text" placeholder="Username" />
               <input type="text" placeholder="Password" />
               <button className="login__submit">Login</button>
            </div>
         </div>
      </div>
   )
}

export default Login
