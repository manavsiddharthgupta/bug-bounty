import styles from "@/styles/communicationcomponent.module.css";
import Button from "../ui/Button";
import CommunicationInput from "./CommunicationInputComponent";

const CommunicationComponent = ({
  communicationLink,
  setCommunicationLink,
  allLinkTypes,
  onSetCommunicationTouched,
}) => {
  return (
    <div
      className={styles.communicationLink}
      onBlur={() => {
        onSetCommunicationTouched(true);
      }}
    >
      {communicationLink.map((link, index) => {
        return (
          <CommunicationInput
            id={index}
            key={index}
            value={link}
            onSetCommunicationHandler={setCommunicationLink}
            CommunicationLinkprovide={allLinkTypes}
          />
        );
      })}

      <Button
        className={styles.add_button}
        onClick={() => {
          setCommunicationLink((prevState) => {
            return [...prevState, { type: "Discord", link: "" }];
          });
        }}
      >
        Add
      </Button>
    </div>
  );
};

export default CommunicationComponent;
