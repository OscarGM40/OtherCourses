import { Link } from "react-router-dom"

const Card = ({ post }) => {
   return (
      <div className="card">
         <Link className="navbar__link" to={`/post/${post.id}`}>
            <span className="card__title">{post.title}</span>
            <img src={post.img} alt="" className="card__img" />
            <p className="card__desc">{post.desc}</p>
            <button className="card__button">Read more</button>
         </Link>
      </div>
   )
}

export default Card
