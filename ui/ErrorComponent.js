import styles from "../styles/error.module.css";
const ErrorComponent = ({ children }) => {
  return <p className={styles.error}>{children}</p>;
};

export default ErrorComponent;
