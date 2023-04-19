import styles from "../styles/modal.module.css";

import CreateBountyModal from "@/components/CreateBountyModal";

export const Modal = () => {
  return (
    <div className={styles.modal}>
      <CreateBountyModal />
    </div>
  );
};

export const BackGroundModal = (props) => {
  return <div onClick={props.onSetCloseModal} className={styles.bgModal}></div>;
};
