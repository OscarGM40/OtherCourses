import { useParams } from "react-router-dom";
import { posts } from "../helpers/dummy-data";

const Post = () => {

const { id } = useParams();

// console.log(location,'location')
// console.log(params,'params')

const post = posts[id-1]
// const post = posts.find(post => post.id === +id)

   return (
      <div className="post">
         <img src={post.img} alt="" className="post__img" />
         <h1 className="post__title">{post.title}</h1>
         <p className="post__desc">{post.desc}</p>
         <p className="post__long-desc">{post.longDesc}</p>
      </div>
   )
}

export default Post
