
import Styles from './../styles/Article.module.css';
   import Link from 'next/link'


const Article = (props) => {
   // console.log(props)

   return (
      <div className={Styles.grid}>
         <Link href="/props/[id]" as={`/props/${props.id}`}>
         <a className={Styles.card}>
            <h3>{props.title} &rarr;</h3> 
            <p>{props.body}</p>
         </a>
         </Link>
      </div>
   )
}

export default Article
