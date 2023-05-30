import styles from "../styles/button.module.css";

const Button = ({ children, className, onClick, makeDisabled }) => {
  let classes = makeDisabled ? styles.disableBtn : styles.btn;
  return (
    <button
      onClick={onClick}
      className={`${className} ${classes}`}
      disabled={makeDisabled}
    >
      {children}
    </button>
  );
};
export default Button;
