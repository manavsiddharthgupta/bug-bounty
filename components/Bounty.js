import Tag from "@/ui/Tag";
import styles from "../styles/bounty.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Bounty = () => {
  return (
    <div className={styles.bounty}>
      <div className={styles.bounty_price_status_outer}>
        <h1 className={styles.bounty_price}>₹ 154.00</h1>
        <Tag>Open</Tag>
      </div>
      <div className={styles.bounty_title}>
        <h2>
          Trim field surrounding spaces full Hide or get rid of the source
          textarea.
        </h2>
        <div>
          {/* fetch tags text and change color*/}
          <Tag className={styles.bounty_status}>bug</Tag>
          <Tag className={styles.bounty_status}>priority</Tag>
        </div>
      </div>
      <p className={styles.bounty_subTitle}>
        I would like to convert my ChatGPT clone codebase to trim field
        surrounding need to have full Hide or get rid of the source textarea.
      </p>
      <span className={styles.bounty_reqskills_title}>Skills Required : </span>
      <span className={styles.bounty_reqskills_title}>
        React, Javascript, Python, Machine Learning
      </span>
      <div className={styles.extra_inf}>
        <p>opened on Mar 10th by @manavgupta</p>
        <div>
          <FontAwesomeIcon className={styles.user_icon} icon={faUser} />
          <span>5 Applicants</span>
        </div>
      </div>
    </div>
  );
};

export default Bounty;
