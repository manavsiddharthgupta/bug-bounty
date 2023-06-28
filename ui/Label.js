import styles from "@/styles/label.module.css";
const Label = (props) => {
  return <label className={styles.label}>{props.children}</label>;
};
export default Label;
