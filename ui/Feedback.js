import styles from "@/styles/error.module.css";

const Feedback = ({ children }) => {
  return <p className={styles.feedback}>{children}</p>;
};

export default Feedback;
