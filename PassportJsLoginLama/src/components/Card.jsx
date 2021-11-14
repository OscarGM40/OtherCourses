const Card = ({ post }) => {
   return (
      <div className="card">
         <span className="card__title">{post.title}</span>
         <img src={post.img} alt="" className="card__img" />
         <p className="card__desc">{post.desc}</p>
         <button className="card__button">Read more</button>
      </div>
   )
}

export default Card
