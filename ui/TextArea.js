import styles from "@/styles/textarea.module.css";
import Label from "./Label";
import List from "./List";

const TextArea = ({ label, onBlur, className, value, onChange }) => {
  return (
    <List>
      <Label>{label}</Label>
      <textarea
        className={`${className} ${styles.input}`}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    </List>
  );
};

export default TextArea;
