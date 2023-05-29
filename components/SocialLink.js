import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/sociallink.module.css";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const SocialLink = ({ children }) => {
  return (
    <div className={styles.link}>
      <span>{children}</span>
      <FontAwesomeIcon
        className={styles.icon}
        icon={faArrowUpRightFromSquare}
      />
    </div>
  );
};

export default SocialLink;
