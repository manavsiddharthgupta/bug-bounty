import styles from "@/styles/input.module.css";
import Label from "./Label";
import List from "./List";

const Input = ({ type, label, inputValue, onChange, onBlur, className }) => {
  return (
    <List>
      <Label>{label}</Label>
      <input
        className={`${className} ${styles.input}`}
        value={inputValue}
        type={type}
        onBlur={onBlur}
        onChange={onChange}
      />
    </List>
  );
};

export default Input;
