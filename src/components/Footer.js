import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.h3}>Uma Plataforma para troca de conhecimento!</h3>
      <p>Mini Blog &copy; 2022</p>
    </footer>
  );
};

export default Footer;