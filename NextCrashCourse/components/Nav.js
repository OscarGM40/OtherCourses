import NavStyles from "../styles/Nav.module.css";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className={NavStyles.nav}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
};

export default Nav;
