import styles from "../styles/applymodal.module.css";
import Input from "./Input";
import { Modal } from "./Modal";
import TextArea from "./TextArea";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "./Button";
import CommunicationComponent from "@/components/CommunicationComponent";
import useTextAreaState from "@/hooks/useTextAreaState";
import useInputState from "@/hooks/useInputState";

const ApplyModal = ({ totalApplicants, onSetCloseModal }) => {
  const [communicationLink, setCommunicationLink] = useState([
    {
      type: "Discord",
      link: "",
    },
  ]);

  const router = useRouter();

  const {
    textState: applicationMessage,
    isValueValid: isapplicationMessageValid,
    isTouched: isapplicationMessageTouch,
    setBlurHandler: setApplicationMessageBlurHandler,
    onChangeHandler: onChangeApplicationMessageHandler,
  } = useTextAreaState();

  const {
    inputRef: applicationEmail,
    isValueValid: isApplicationEmailValid,
    isTouched: isApplicationEmailTouch,
    setBlurHandler: setApplicationEmailBlurHandler,
  } = useInputState();

  const allLinkTypes = [
    { type: "Discord", placeholder: "Username #1323" },
    { type: "Twitter", placeholder: "Username" },
    { type: "Github", placeholder: "Username" },
    { type: "LinkedIn", placeholder: "Username" },
    { type: "Website", placeholder: "https://example.com" },
  ];

  const sendApplicationFunc = () => {
    const data = {
      applicationData: {
        applicationMessage,
        communicationLink,
        applicationEmail: applicationEmail.current.value,
        bountyId: router.query.bounty_id,
      },
      updatedBountyApplicants: totalApplicants + 1,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:3002/applications", options)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    onSetCloseModal();
  };

  return (
    <Modal>
      <div className={styles.outer_applyModal}>
        <h1>Apply to work on Bounty</h1>
        <TextArea
          className={styles.apply_textArea}
          label="Application Message"
          onBlur={setApplicationMessageBlurHandler}
          onChange={onChangeApplicationMessageHandler}
          value={applicationMessage}
        />
        <Input
          className={styles.apply_input}
          type="email"
          label="E-Mail"
          inputRef={applicationEmail}
          onBlur={setApplicationEmailBlurHandler}
        />
        <CommunicationComponent
          communicationLink={communicationLink}
          setCommunicationLink={setCommunicationLink}
          allLinkTypes={allLinkTypes}
        />
        <Button onClick={sendApplicationFunc}>Send Application</Button>
      </div>
    </Modal>
  );
};

export default ApplyModal;

// <div className={styles.communicationLink}>
//   {communicationLink.map((link, index) => {
//     return (
//       <CommunicationInput
//         id={index}
//         key={index}
//         value={link}
//         onSetCommunicationHandler={setCommunicationLink}
//         CommunicationLinkprovide={allLinkTypes}
//       />
//     );
//   })}

//   <Button
//     className={styles.add_button}
//     onClick={() => {
//       setCommunicationLink((prevState) => {
//         return [...prevState, { type: "Discord", link: "" }];
//       });
//     }}
//   >
//     Add
//   </Button>
// </div>
