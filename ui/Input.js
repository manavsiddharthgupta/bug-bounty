import styles from "../styles/input.module.css";
import Label from "./Label";
import List from "./List";

const Input = ({ type, label, inputRef, onBlur, className }) => {
  return (
    <List>
      <Label>{label}</Label>
      <input
        className={`${className} ${styles.input}`}
        ref={inputRef}
        type={type}
        onBlur={onBlur}
      />
    </List>
  );
};

export default Input;
