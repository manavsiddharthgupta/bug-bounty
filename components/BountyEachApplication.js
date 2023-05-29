import Button from "@/ui/Button";
import styles from "../styles/bountyeachapplication.module.css";
import { useEffect, useRef, useState } from "react";
import SocialLink from "./SocialLink";
const BountyApplication = ({ applicationData }) => {
  const [isOverflowing, setOverflowing] = useState(false);
  const [isShowmore, setShowmore] = useState(false);
  const detailsRef = useRef();

  useEffect(() => {
    const totalheight = detailsRef.current.clientHeight;
    const lineHeight = 20.8;
    if (totalheight / lineHeight > 4.0) {
      setOverflowing(true);
      setShowmore(true);
    } else {
      setOverflowing(false);
    }
  }, []);

  useEffect(() => {
    function checkOverFlow() {
      const totalheight = detailsRef.current.clientHeight;
      const lineHeight = 20.8;
      if (totalheight / lineHeight > 4.0) {
        if (!isOverflowing) {
          setOverflowing(true);
          setShowmore(true);
        }
      } else {
        setOverflowing(false);
      }
    }

    window.addEventListener("resize", checkOverFlow);

    return () => window.removeEventListener("resize", checkOverFlow);
  }, [isOverflowing]);

  const onShowmoreHandler = () => {
    if (isShowmore) {
      setShowmore(false);
    } else {
      setShowmore(true);
    }
  };
  return (
    <div className={styles.application_outer_div}>
      <div className={styles.application_userprofile}>
        <img src="" alt="_pfp" />
        <p>{applicationData.applicationEmail}</p>
      </div>
      <p className={styles.application_postedDate}>Applied 2 days ago</p>
      <p
        ref={detailsRef}
        className={
          !isShowmore
            ? styles.application_details
            : `${styles.application_details} ${styles.application_showmore}`
        }
      >
        {applicationData.applicationMessage}
      </p>

      {isOverflowing && (
        <Button onClick={onShowmoreHandler} className={styles.btn}>
          {isShowmore ? "show more" : "show less"}
        </Button>
      )}
      <div className={styles.connections}>
        {applicationData.communicationLink.map(({ type }) => {
          return <SocialLink key={type}>{type}</SocialLink>;
        })}
      </div>
    </div>
  );
};

export default BountyApplication;

// add connection links
