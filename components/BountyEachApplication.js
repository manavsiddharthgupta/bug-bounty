import Button from "@/ui/Button";
import styles from "../styles/bountyeachapplication.module.css";
import { useEffect, useRef, useState } from "react";
const BountyApplication = () => {
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
        <p>@manavsiddgupta</p>
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
        Hello, My past two completed bounties were just this, and I will make
        adjustments and tune to your purpose. I have worked with the Canvas API
        before, and although my school does not personally use it, I assisted in
        the development of a Canvas reminder script for the University of
        Illinois Urbana-Champaign. Your resultant bot will also ship with the
        ability to identify and remember students,logging messages and
        preserving context between sessions. Please expect constant and
        transparent development, and I will actively consult you during the
        development process to ensure I ship to your exact criteria. Contact me
        at Bolt#2348 on Discord, or at the email below, and I look forward to
        working with you. Hello, My past two completed bounties were just this,
        and I will make adjustments and tune to your purpose. I have worked with
        the Canvas API before, and although my school does not personally use
        it, I assisted in the development of a Canvas reminder script for the
        University of Illinois Urbana-Champaign. Your resultant bot will also
        ship with the ability to identify and remember students, logging
        messages and preserving context between sessions. Please expect constant
        and transparent development, and I will actively consult you during the
        development process to ensure I ship to your exact criteria. Contact me
        at Bolt#2348 on Discord, or at the email below, and I look forward to
        working with you.
      </p>

      {isOverflowing && (
        <Button onClick={onShowmoreHandler} className={styles.btn}>
          {isShowmore ? "show more" : "show less"}
        </Button>
      )}
      <div className={styles.connections}></div>
    </div>
  );
};

export default BountyApplication;

// add connection links
