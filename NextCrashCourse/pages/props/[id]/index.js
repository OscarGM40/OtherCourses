import { useRouter } from 'next/router'
import Link from "next/link"
import { server } from '../../../config'
import Meta from '../../../components/Meta'


const Article = ({article}) => {
   const router = useRouter()
   console.log(router.query)
   const { id } = router.query   
   return (
      <>
      <Meta title={article.title }/>
         <h1 className="titulo">This is the Article {article.id}</h1>
         <h1 className="titulo">{article.title}</h1>
         <p>{article.body}</p>
         <hr />
         <Link href="/" >Volver al Home</Link>
         <style jsx>
            {`
            .titulo {
               cursor:not-allowed;
               color:red!important;
            }
            `}
            </style>
      </>
   )
}

// export const getServerSideProps = async (context) => {
export const getStaticProps = async (context) => {
   // const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)
  const res = await fetch(`${server}/api/articles/${context.params.id}`)
   const article = await res.json();
   
   return {
      props:{
         article
      }
   }
}

export const getStaticPaths = async() => {
   // const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
   const res = await fetch(`${server}/api/articles`);
   const articles = await res.json();
   const ids = articles.map(article => article.id);
   const paths = ids.map(id => ({
      params:{id:id.toString()}
   }))
   
   return {
      paths,
      fallback:false
   }

}

export default Article
