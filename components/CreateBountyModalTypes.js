import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/createbounty_modaltypes.module.css";

const BountyType = ({
  title,
  subtitle,
  expectedPrice,
  titleIcon,
  onClick,
  styling,
}) => {
  console.log(styling);
  return (
    <li
      id={title}
      onClick={onClick}
      className={styles.each_bountyTypes}
      style={styling}
    >
      <div className={styles.bounty_types_title}>
        <FontAwesomeIcon icon={titleIcon} />
        <h2>{title}</h2>
      </div>
      <p className={styles.bounty_type_subTitle}>{subtitle}</p>
      <p className={styles.bounty_type_expPrice}>Typically ~ {expectedPrice}</p>
    </li>
  );
};
export default BountyType;
