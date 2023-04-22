import styles from "../styles/textarea.module.css";
import Label from "./Label";
import List from "./List";

const TextArea = ({ label, inputRef, onBlur, className }) => {
  return (
    <List>
      <Label>{label}</Label>
      <textarea
        className={`${className} ${styles.input}`}
        ref={inputRef}
        onBlur={onBlur}
      />
    </List>
  );
};

export default TextArea;
