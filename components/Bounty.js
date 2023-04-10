import styles from "../styles/bounty.module.css";
const Bounty = () => {
  return (
    <div className={styles.bounty}>
      <div className={styles.bounty_price_status_outer}>
        <h1 className={styles.bounty_price}>₹ 154.00</h1>
        <div className={styles.bounty_status}>
          <p>Open</p>
        </div>
      </div>
      <div className={styles.bounty_title}>
        <h2>Trim field surrounding spaces</h2>
        <div></div>
      </div>
      {/* <p></p>
      <p></p>
      <p></p> */}
    </div>
  );
};

export default Bounty;
