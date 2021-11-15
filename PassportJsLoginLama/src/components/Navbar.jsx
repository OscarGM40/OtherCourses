import { Link } from "react-router-dom"


const Navbar = ({ user }) => {
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
                  <img src="https://cdn.pixabay.com/photo/2021/05/09/06/07/dog-6240043_960_720.jpg" alt="" className="navbar__avatar" />
               </li>
               <li className="navbar__list-item">
                  John Doe
               </li>
               <li className="navbar__list-item">Logout</li>
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
