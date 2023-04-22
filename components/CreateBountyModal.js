import { useRouter } from "next/router";
import Button from "../ui/Button";
import styles from "../styles/createbountymodal.module.css";
import {
  faTools,
  faLightbulb,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import BountyType from "./CreateBountyModalTypes";
import { useState } from "react";

const CreateBountyModal = () => {
  const [selectedBountyType, setBountyType] = useState(null);
  const router = useRouter();
  const allBountyTypes = [
    {
      title: "Tools",
      id: "tools",
      subTitle: "Get a custom tool, automated bot, or AI systems",
      expectedPrice: "₹ 1000",
      titleIcon: faComment,
    },
    {
      title: "Web Application",
      id: "web-app",
      subTitle: "Build an interactive web application and share the world",
      expectedPrice: "₹ 2500",
      titleIcon: faTools,
    },
    {
      title: "Get Help",
      id: "get-help",
      subTitle: "Fix a bud, build a feature, or learn something new",
      expectedPrice: "₹ 400",
      titleIcon: faTools,
    },
    {
      title: "Customs",
      id: "customs",
      subTitle: "Needs something else, describe your bounty",
      expectedPrice: "₹ 1000",
      titleIcon: faLightbulb,
    },
  ];
  const onCreateBounty = () => {
    if (selectedBountyType) {
      router.push(`/create-new-bounty/?type=${selectedBountyType}`);
    }
  };

  const onSelectBountyTypes = (event) => {
    const parent = event.target.closest("li");
    setBountyType(parent.id);
  };

  return (
    <div className={styles.modal_outerlayer}>
      <h1>Create Bounty Modal</h1>
      <ul className={styles.choose_bountyTypes}>
        {allBountyTypes.map((eachTypes) => {
          return (
            <BountyType
              id={eachTypes.id}
              key={eachTypes.id}
              title={eachTypes.title}
              subtitle={eachTypes.subTitle}
              expectedPrice={eachTypes.expectedPrice}
              titleIcon={eachTypes.titleIcon}
              onClick={onSelectBountyTypes}
              styling={
                selectedBountyType === eachTypes.id
                  ? { outline: "2px solid black" }
                  : { outline: "none" }
              }
            />
          );
        })}
      </ul>
      <Button className={styles.createbounty_btn} onClick={onCreateBounty}>
        Create Bounty
      </Button>
    </div>
  );
};

export default CreateBountyModal;
