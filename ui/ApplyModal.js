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

const ApplyModal = ({
  totalApplicants,
  onSetCloseModal,
  onSetBountyApplication,
}) => {
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

  const [isLoadingState, setLoadingState] = useState(false);
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
    setLoadingState(true);
    fetch("http://localhost:3002/applications", options)
      .then((res) => {
        if (!res.ok) {
          throw Error("Your application could not be posted");
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        onSetBountyApplication((prevState) => [
          ...JSON.parse(JSON.stringify(prevState)),
          data.applicationData,
        ]);
        onSetCloseModal();
      })
      .catch((err) => {
        setLoadingState(true);
        console.log(err);
      });
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
        <Button
          makeDisabled={isLoadingState ? true : false}
          className={styles.send_button}
          onClick={sendApplicationFunc}
        >
          Send Application
        </Button>
      </div>
    </Modal>
  );
};

export default ApplyModal;
