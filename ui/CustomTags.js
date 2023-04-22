import styles from "../styles/custom_tag.module.css";

const CustomTags = ({ children }) => {
  return <span className={styles.each_tag}>{children}</span>;
};
export default CustomTags;
