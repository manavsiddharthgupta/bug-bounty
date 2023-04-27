import styles from "../styles/bountydescription.module.css";
import GetHelp from "../store/gethelp.mdx";
import Custom from "../store/custom.mdx";
import WebApp from "../store/webapp.mdx";
import Tools from "../store/tool.mdx";

const BountyDescription = () => {
  const reqSkills = ["Machine Learning", "WebApp", "React"];
  const tags = ["React", "Javascript", "node", "css"];
  return (
    <>
      <h2 className={styles.bountyType_title}>Build An App For Others</h2>
      <div className={styles.bountyDesc_extras}>
        <h3>Required Skills:</h3>
        <p>
          {reqSkills.reduce((iter, skill) => {
            return iter + ", " + skill;
          })}
        </p>
      </div>
      <div className={styles.bountyDesc_extras}>
        <h3>Tags:</h3>
        <p>
          {tags.reduce((iter, skill) => {
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
          <Custom />
        </div>
      </div>
    </>
  );
};
export default BountyDescription;

// Add Communication Link dynamically
// Add Style to the page
