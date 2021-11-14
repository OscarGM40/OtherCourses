import Styles from "../styles/Layout.module.css";
import Header from "./Header";
import Meta from "./Meta";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
    <Meta />
      <Nav />
      <div className={Styles.container}>
        <main className={Styles.main}>
          <Header />
           { children }
        </main>
      </div>
    </>
  );
}
