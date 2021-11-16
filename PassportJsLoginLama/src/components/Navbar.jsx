import { Link } from "react-router-dom"


const Navbar = ({ user }) => {
   
   const logout = () => {
      window.open("http://localhost:5000/auth/logout", "_self");
   }


   return (
      <div className="navbar">
         <span className="navbar__logo">
            <Link to="/" className="navbar__link">
               Lama App
            </Link>
         </span>
         {user ? (

            <ul className="navbar__list">
               <li className="navbar__list-item">
                  <img src={user ? user?.photos[0]?.value : 'https://cdn.pixabay.com/photo/2021/11/11/13/08/leopard-6786267_960_720.jpg'} alt="" className="navbar__avatar" />
               </li>
               <li className="navbar__list-item">
                  {user.displayName}
               </li>
               <li className="navbar__list-item"
                  onClick={logout}
               >Logout</li>
            </ul>
         ) : (
            <span className="navbar__login--link">
               <Link to="/login" className="navbar__link">
                  Login
               </Link>
            </span>
         )}

      </div>
   )
}

export default Navbar
