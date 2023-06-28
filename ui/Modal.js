import styles from "@/styles/modal.module.css";

export const Modal = ({ children }) => {
  return <div className={styles.modal}>{children}</div>;
};

export const BackGroundModal = (props) => {
  return <div onClick={props.onSetCloseModal} className={styles.bgModal}></div>;
};
