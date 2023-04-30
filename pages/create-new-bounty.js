import Card from "@/ui/Card";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/create-new-bounty.module.css";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import useInputState from "@/hooks/useInputState";
import TextArea from "@/ui/TextArea";
import { useEffect, useState } from "react";
import InputTags from "@/ui/InputTags";
import AmountInput from "@/components/AmountInput";
import {
  custom,
  tools,
  webApp,
  getHelp,
} from "@/store/predefined-create-bounty-desc";
import useTextAreaState from "@/hooks/useTextAreaState";
import { bountyDataformat } from "@/store/createBountyconversion";
import CommunicationComponent from "@/components/CommunicationComponent";

const CreateBounty = () => {
  // states
  const router = useRouter();
  const [createBountyType, setBountyType] = useState(custom);
  const [tags, setTags] = useState([]);
  const [skillRequired, setSkillRequired] = useState([]);
  const [communicationLink, setCommunicationLink] = useState([
    {
      type: "Discord",
      link: "",
    },
  ]);
  const [amount, setAmount] = useState(createBountyType.amt);
  const [isFormTouched, setFormTouched] = useState(false);

  // custom hooks
  const {
    inputRef: bountyTitleRef,
    isValueValid: isTitleValid,
    isTouched: isTitleTouch,
    setBlurHandler: setTitleBlurHandler,
  } = useInputState();

  const {
    textState: bountySubTitleValue,
    isValueValid: isSubtitleValid,
    isTouched: isSubTitleTouch,
    setBlurHandler: setSubTitleBlurHandler,
    onChangeHandler: onChangeSubTitleHandler,
  } = useTextAreaState();

  const {
    textState: bountyDescriptionValue,
    isValueValid: isDescriptionValid,
    isTouched: isDescriptionTouch,
    setBlurHandler: setDescriptionBlurHandler,
    onChangeHandler: onChangeDescriptionHandler,
  } = useTextAreaState(createBountyType?.descStruc);

  const {
    inputRef: bountyCompleteDateRef,
    isValueValid: isBountyCompleteDateValid,
    isTouched: isBountyCompleteDateTouch,
    setBlurHandler: setBountyCompleteDateBlurHandler,
  } = useInputState();

  const {
    inputRef: bountyGithubLinkRef,
    isValueValid: isGithubLinkValid,
    isTouched: isGithubLinkTouch,
    setBlurHandler: setBountyGithubLinkBlurHandler,
  } = useInputState();

  const {
    inputRef: bountyFigmaLinkRef,
    isValueValid: isFigmaLinkValid,
    isTouched: isFigmaLinkTouch,
    setBlurHandler: setBountyFigmaLinkBlurHandler,
  } = useInputState();

  // side Effects
  useEffect(() => {
    switch (router.query.type) {
      case "web-app":
        setBountyType(webApp);
        setAmount(webApp.amt);
        break;
      case "tools":
        setBountyType(tools);
        setAmount(tools.amt);
        break;
      case "get-help":
        setBountyType(getHelp);
        setAmount(getHelp.amt);
    }
  }, [router.query.type]);

  useEffect(() => {
    function alertMessage(event) {
      if (isFormTouched) {
        event.preventDefault();
        event.returnValue = "\\o/";
      }
    }
    window.addEventListener("beforeunload", alertMessage);
    return () => {
      window.removeEventListener("beforeunload", alertMessage);
    };
  }, [isFormTouched]);

  // functions
  const onCreateBountyFunc = () => {
    let figmaLink = null;
    if (router.query.type === "web-app") {
      figmaLink = bountyFigmaLinkRef?.current?.value;
    }
    bountyDataformat(
      bountyTitleRef?.current?.value,
      bountySubTitleValue,
      bountyDescriptionValue,
      tags,
      skillRequired,
      bountyCompleteDateRef?.current?.value,
      bountyGithubLinkRef?.current?.value,
      figmaLink,
      communicationLink,
      amount,
      router.query.type
    );
  };

  const onCreateTag = (val) => {
    setTags((state) => {
      return [...state, val];
    });
  };

  const onCreateReqSkills = (val) => {
    setSkillRequired((state) => {
      return [...state, val];
    });
  };

  const allLinkTypes = [
    { type: "Discord", placeholder: "Username #1323" },
    { type: "Email", placeholder: "example@example.com" },
  ];

  return (
    <>
      <Head>
        <title>Create Bounty Page</title>
        <meta
          name="Create Bounty Page"
          content="Here you can create your bounty"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        onClick={() => {
          setFormTouched(true);
        }}
      >
        <Card>
          <div className={styles.outer_create_new_bounty}>
            <Button className={styles.back_btn}>
              <p>&larr;</p>
              <p>back to all bounties</p>
            </Button>
            <h1>Create a Bounty</h1>
            <section>
              <Input
                inputRef={bountyTitleRef}
                onBlur={setTitleBlurHandler}
                label="Bounty Title"
                type="text"
              />
              <TextArea
                value={bountySubTitleValue}
                onChange={onChangeSubTitleHandler}
                className={styles.subTitle}
                onBlur={setSubTitleBlurHandler}
                label="Sub Title"
              />
              <TextArea
                value={bountyDescriptionValue}
                onChange={onChangeDescriptionHandler}
                className={styles.desc}
                onBlur={setDescriptionBlurHandler}
                label="Description"
              />
              <InputTags
                createTagfunc={onCreateTag}
                label="Tags"
                tagsData={tags}
                placeholder="Write required tags"
              />
              <InputTags
                createTagfunc={onCreateReqSkills}
                label="Required Skills"
                tagsData={skillRequired}
                placeholder="Write required skills"
              />
              <Input
                inputRef={bountyCompleteDateRef}
                onBlur={setBountyCompleteDateBlurHandler}
                label="Bounty Completition Date"
                type="date"
              />
              <Input
                inputRef={bountyGithubLinkRef}
                onBlur={setBountyGithubLinkBlurHandler}
                label="Github Repository Link"
                type="text"
              />

              {router.query.type === "web-app" && (
                <Input
                  inputRef={bountyFigmaLinkRef}
                  onBlur={setBountyFigmaLinkBlurHandler}
                  label="Figma File Link"
                  type="text"
                />
              )}
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
                      // CommunicationLinkprovide={allLinkTypes}
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
              <AmountInput
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <Button onClick={onCreateBountyFunc}>Create Bounty</Button>
            </section>
          </div>
        </Card>
      </main>
    </>
  );
};
export default CreateBounty;

// content change based on types which will reflects on bounty details page
// make sure change bounty details page also
// add input feedback logic
// set min amount i.e > 0
// date validation i.e date should be greater than today
// tags and requiredSkills validation i.e should not be empty
