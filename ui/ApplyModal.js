import styles from "../styles/applymodal.module.css";
import Input from "./Input";
import { Modal } from "./Modal";
import TextArea from "./TextArea";
import { useState } from "react";
import Button from "./Button";
import CommunicationComponent from "@/components/CommunicationComponent";

const ApplyModal = () => {
  const [communicationLink, setCommunicationLink] = useState([
    {
      type: "Discord",
      link: "",
    },
  ]);
  console.log(communicationLink);
  const allLinkTypes = [
    { type: "Discord", placeholder: "Username #1323" },
    { type: "Twitter", placeholder: "Username" },
    { type: "Github", placeholder: "Username" },
    { type: "LinkedIn", placeholder: "Username" },
    { type: "Website", placeholder: "https://example.com" },
  ];
  return (
    <Modal>
      <div className={styles.outer_applyModal}>
        <h1>Apply to work on Bounty</h1>
        <TextArea
          className={styles.apply_textArea}
          label="Application Message"
        />
        <Input className={styles.apply_input} type="text" label="E-Mail" />
        <CommunicationComponent
          communicationLink={communicationLink}
          setCommunicationLink={setCommunicationLink}
          allLinkTypes={allLinkTypes}
        />
        {/* <div className={styles.communicationLink}>
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
        </div> */}
        <Button>Send Application</Button>
      </div>
    </Modal>
  );
};

export default ApplyModal;
