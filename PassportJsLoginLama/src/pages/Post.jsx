import { posts } from "../helpers/dummy-data";

const Post = () => {

   const post = posts[2];

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
