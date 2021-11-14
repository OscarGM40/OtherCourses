import classes from "../styles/HomePage.module.css";
import Head from "next/head";
import Article from "../components/Article";
import { server } from "../config";
import Meta from "../components/Meta";

export default function HomePage({articles}) {
  // console.log(articles,'articles')
  return (
    <div>
      {/* ya no usaré Head en cada componente */}
      <Meta title="Home"/>
{/*       <Head>
        <title>Next Course</title>
        <link rel="favicon" href="favicon.ico" />
        <meta name="saludo" content="hola" />
      </Head> */}
    {/*   <div className={classes.flex01}>
        <h1 className={classes.h1}>Hello from Next</h1>
      </div> */}

      { articles.map( article => (
          <Article key={article.id} {...article}/>
      ))}
      
    </div>
  );
}
console.log(process.env.NODE_ENV,'ambiente')
export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`)
  const articles = await res.json();
   
  // getStaticProps devuelve un objeto y en su propiedad props que es un objeto se le pasa la data que yo quiera
  return {
    props:{
      articles
    }
  }
}
/* 
export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
  const articles = await res.json();
   
  // getStaticProps devuelve un objeto y en su propiedad props que es un objeto se le pasa la data que yo quiera
  return {
    props:{
      articles
    }
  }
} */