import styles from "../styles/BountyAllApplication.module.css";
import BountyApplication from "./BountyEachApplication";

const BountyAllApplication = () => {
  return (
    <>
      <h1>Applications</h1>
      <div className={styles.allapplication_outer_div}>
        <BountyApplication />
      </div>
    </>
  );
};

export default BountyAllApplication;
