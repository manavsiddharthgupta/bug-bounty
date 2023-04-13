import styles from "../styles/button.module.css";

const Button = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={`${className} ${styles.btn}`}>
      {children}
    </button>
  );
};
export default Button;
