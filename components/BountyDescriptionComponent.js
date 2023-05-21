import styles from "../styles/bountydescription.module.css";
import ReactMarkdown from "react-markdown";

const BountyDescription = ({ bountyData }) => {
  return (
    <>
      <h2 className={styles.bountyType_title}>Build An App For Others</h2>
      <div className={styles.bountyDesc_extras}>
        <h3>Required Skills:</h3>
        <p>
          {bountyData.requiredSkills.reduce((iter, skill) => {
            return iter + ", " + skill;
          })}
        </p>
      </div>
      <div className={styles.bountyDesc_extras}>
        <h3>Tags:</h3>
        <p>
          {bountyData.tags.reduce((iter, skill) => {
            return iter + ", " + skill;
          })}
        </p>
      </div>
      <div className={styles.bountyDesc_extras}>
        <h3>Connect With Me:</h3>
      </div>
      <div className={styles.bountyDesc_outer}>
        <h3>Bounty Description:</h3>
        <div className={styles.bountyDesc}>
          <ReactMarkdown className={styles.mdx}>
            {bountyData.description}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
};
export default BountyDescription;

// Add Communication Link dynamically
// Add Style to the page
// change the md content scene
