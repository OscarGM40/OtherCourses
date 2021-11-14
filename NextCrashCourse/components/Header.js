import Styles from "./../styles/Header.module.css";

const Header = () => {
  return (
    <div>
      <h1 className={Styles.title}>
        <span>Webdev</span> News
      </h1>
      <p className={Styles.description}>
        Keep up to date with the latest web dev news
      </p>
      <style jsx>
        {`
          .title {
            color: red;
          }
        `}
      </style>
    </div>
  );
};

export default Header;
