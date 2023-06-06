import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/sociallink.module.css";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const SocialLink = ({ children, link }) => {
  if (children.toLowerCase() === "discord") {
    link = `https://discord.com/users/${link}`;
  } else if (children.toLowerCase() === "email") {
    link = `mailto:${link}`;
  } else if (children.toLowerCase() === "twitter") {
    link = `https://twitter.com/${link}`;
  }
  return (
    <a href={link} className={styles.link} target="_blank">
      <span>{children}</span>
      <FontAwesomeIcon
        className={styles.icon}
        icon={faArrowUpRightFromSquare}
      />
    </a>
  );
};

export default SocialLink;
