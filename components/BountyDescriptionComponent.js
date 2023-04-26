import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styles from "../styles/bountydescription.module.css";
import remarkGfm from "remark-gfm";
import { webApp } from "@/store/predefined-create-bounty-desc";

const BountyDescription = () => {
  return (
    <>
      <h2 className={styles.bountyType_title}>Build An App For Others</h2>
      <div className={styles.bountyDesc_outer}>
        <h3>Bounty Description:</h3>
        <div className={styles.bountyDesc}>
          <ReactMarkdown
            className={styles.mdText}
            children={webApp.descStruc}
            remarkPlugins={[remarkGfm]}
          />
        </div>
      </div>
      <div className={styles.bountyDesc_extras}>
        <h3>Required Skills:</h3>
        <p>Machine Learning, WebApp, React</p>
      </div>
      <div className={styles.bountyDesc_extras}>
        <h3>Tags:</h3>
        <p>React, Javascript, node, css</p>
      </div>
      <div className={styles.bountyDesc_extras}>
        <h3>Connect With Me:</h3>
      </div>
    </>
  );
};
export default BountyDescription;
