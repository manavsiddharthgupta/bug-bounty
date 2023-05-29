import Tag from "@/ui/Tag";
import styles from "../styles/bounty.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Bounty = ({ eachBountyData }) => {
  const date = new Date(eachBountyData.openedOn);
  let postedOn = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  return (
    <div className={styles.bounty}>
      <div className={styles.bounty_price_status_outer}>
        <h1 className={styles.bounty_price}>{eachBountyData.price}</h1>
        <Tag>{eachBountyData.bountyStatus}</Tag>{" "}
        {/*  change color according to status */}
      </div>
      <div className={styles.bounty_title}>
        <h2>{eachBountyData.title}</h2>
        <div className={styles.bountyAllTags}>
          {/* random change color */}
          {eachBountyData.tags.map((eachtag) => {
            return (
              <Tag key={eachtag} className={styles.bounty_status}>
                {eachtag}
              </Tag>
            );
          })}
        </div>
      </div>
      <p className={styles.bounty_subTitle}>{eachBountyData.subTitle}</p>
      <span className={styles.bounty_reqskills_title}>Skills Required : </span>
      <span className={styles.bounty_reqskills_title}>
        {eachBountyData.requiredSkills.reduce(
          (accumulator, currentSkill, index) => {
            if (eachBountyData.requiredSkills.length - 1 === index) {
              return accumulator + currentSkill;
            }
            return accumulator + `${currentSkill}, `;
          },
          ""
        )}
      </span>
      <div className={styles.extra_inf}>
        <p>
          opened on {postedOn} by @{eachBountyData.openedBy}
        </p>
        <div>
          <FontAwesomeIcon className={styles.user_icon} icon={faUser} />
          <span>{eachBountyData.applicants} Applicants</span>
        </div>
      </div>
    </div>
  );
};

export default Bounty;
