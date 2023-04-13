import { useRouter } from "next/router";
import styles from "../styles/modal.module.css";
import Button from "./Button";

export const Modal = () => {
  const router = useRouter();

  const onCreateBounty = () => {
    router.push("/create-new-bounty");
  };

  return (
    <div className={styles.modal}>
      <p>Modal</p>
      <Button onClick={onCreateBounty}>Create Bounty</Button>
    </div>
  );
};

export const BackGroundModal = (props) => {
  return <div onClick={props.onSetCloseModal} className={styles.bgModal}></div>;
};
