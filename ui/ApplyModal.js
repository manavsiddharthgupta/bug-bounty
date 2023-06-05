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
import Feedback from "./Feedback";

const ApplyModal = ({
  totalApplicants,
  onSetCloseModal,
  onSetBountyApplication,
  user_data,
}) => {
  const [communicationLink, setCommunicationLink] = useState([
    {
      type: "Discord",
      link: "",
    },
  ]);
  const [isCommunicationTouched, setCommunicationTouched] = useState(false);
  let isCommunicationValid = communicationLink.every(({ type, link }) => {
    if (type === "Discord") {
      return /^[a-zA-Z0-9_-]{2,32}$/.test(link);
    }

    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(link);
  });

  const router = useRouter();

  const {
    textState: applicationMessage,
    isValueValid: isApplicationMessageValid,
    isTouched: isApplicationMessageTouch,
    setBlurHandler: setApplicationMessageBlurHandler,
    onChangeHandler: onChangeApplicationMessageHandler,
  } = useTextAreaState(null, (value) => {
    return value.length > 40;
  });

  const {
    inputValue: applicationEmail,
    isValueValid: isApplicationEmailValid,
    isTouched: isApplicationEmailTouch,
    setBlurHandler: setApplicationEmailBlurHandler,
    onChangeHandler: setApplicationEmailChangeHandler,
  } = useInputState((value) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
  });

  console.log(isApplicationEmailValid, isApplicationEmailTouch);
  const [isLoadingState, setLoadingState] = useState(false);
  const allLinkTypes = [
    { type: "Discord", placeholder: "Username #1323" },
    { type: "Twitter", placeholder: "Username" },
    { type: "Github", placeholder: "Username" },
    { type: "LinkedIn", placeholder: "Username" },
    { type: "Website", placeholder: "https://example.com" },
  ];

  const sendApplicationFunc = () => {
    if (
      isApplicationEmailValid &&
      isApplicationMessageValid &&
      isCommunicationValid
    ) {
      const data = {
        applicationData: {
          applicationMessage,
          communicationLink,
          applicationEmail: applicationEmail,
          bountyId: router.query.bounty_id,
          selectionStatus: false,
        },
        updatedBountyApplicants: totalApplicants + 1,
      };

      const accessToken = user_data?.accessToken;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      };

      const options = {
        method: "POST",
        headers,
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
          setLoadingState(false);
          console.log(err);
        });
    }
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
        {!isApplicationMessageValid && isApplicationMessageTouch && (
          <Feedback>
            Your application should contains atleast 40 character
          </Feedback>
        )}
        <Input
          className={styles.apply_input}
          type="email"
          label="E-Mail"
          inputRef={applicationEmail}
          onBlur={setApplicationEmailBlurHandler}
          onChange={setApplicationEmailChangeHandler}
        />
        {!isApplicationEmailValid && isApplicationEmailTouch && (
          <Feedback>Inavlid Email</Feedback>
        )}
        <CommunicationComponent
          communicationLink={communicationLink}
          setCommunicationLink={setCommunicationLink}
          allLinkTypes={allLinkTypes}
          onSetCommunicationTouched={setCommunicationTouched}
        />
        {!isCommunicationValid && isCommunicationTouched && (
          <Feedback>Invalid Communication Details</Feedback>
        )}
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
