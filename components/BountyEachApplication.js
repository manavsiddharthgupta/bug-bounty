import Button from "@/ui/Button";
import styles from "@/styles/bountyeachapplication.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import pfp from "../store/userPfp.png";
import SocialLink from "./SocialLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const BountyApplication = ({
  applicationData,
  isSelected,
  onSetSelected,
  showSelectButton,
  isSelectedBtnLoading,
}) => {
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

  const appliedOn = applicationData.appliedOn
    ? applicationData.appliedOn
    : "Applied 2 days ago";

  const applicationSelected = applicationData._id === isSelected;

  return (
    <div className={styles.application_outer_div}>
      <div className={styles.application_userprofile}>
        <Image
          src={
            applicationData.applicationUserpfp
              ? applicationData.applicationUserpfp
              : pfp
          }
          width={30}
          height={30}
          className={styles.pfpImg}
          alt="alt pfp"
        />
        <p>{applicationData.applicationEmail}</p>
        {!isSelected && showSelectButton && (
          <Button
            onClick={() => {
              onSetSelected(applicationData._id);
            }}
            makeDisabled={isSelectedBtnLoading}
            className={styles.approveBtn}
          >
            <FontAwesomeIcon icon={faCheck} />
            <span>Accept</span>
          </Button>
        )}
        {applicationSelected && (
          <span className={styles.selected}>Selected</span>
        )}
      </div>
      <p className={styles.application_postedDate}>{appliedOn}</p>
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
        {applicationData.communicationLink.map((data) => {
          return (
            <SocialLink link={data.link} key={data.type}>
              {data.type}
            </SocialLink>
          );
        })}
      </div>
    </div>
  );
};

export default BountyApplication;
