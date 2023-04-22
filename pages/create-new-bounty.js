import Card from "@/ui/Card";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/create-new-bounty.module.css";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import useInputState from "@/hooks/useInputState";
import TextArea from "@/ui/TextArea";
import { useState } from "react";
import InputTags from "@/ui/InputTags";
import CommunicationInput from "@/components/CommunicationInputComponent";
import AmountInput from "@/components/AmountInput";

const CreateBounty = () => {
  const {
    inputRef: bountyTitleRef,
    isValueValid: isTitleValid,
    isTouched: isTitleTouch,
    setBlurHandler: setTitleBlurHandler,
  } = useInputState();

  const {
    inputRef: bountySubTitleRef,
    isValueValid: isSubtitleValid,
    isTouched: isSubTitleTouch,
    setBlurHandler: setSubTitleBlurHandler,
  } = useInputState();

  const {
    inputRef: bountyDescRef,
    isValueValid: isDescriptionValid,
    isTouched: isDescriptionTouch,
    setBlurHandler: setDescriptionBlurHandler,
  } = useInputState();

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

  const [tags, setTags] = useState([]);

  const [skillRequired, setSkillRequired] = useState([]);

  const [communicationLink, setCommunicationLink] = useState([
    { communicationType: "Discord", link: "" },
  ]); // Add State to components

  const [amount, setAmount] = useState("0"); // Add State to components

  console.log(isTitleTouch, isTitleValid);
  console.log(isSubTitleTouch, isSubtitleValid);
  console.log(isDescriptionTouch, isDescriptionValid);
  console.log(isBountyCompleteDateTouch, isBountyCompleteDateValid);
  console.log(isGithubLinkTouch, isGithubLinkValid);

  const router = useRouter();

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
      <main>
        <Card>
          <div className={styles.outer_create_new_bounty}>
            {/* <p>Create Bounty - {router.query.type}</p> */}
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
                className={styles.subTitle}
                inputRef={bountySubTitleRef}
                onBlur={setSubTitleBlurHandler}
                label="Sub Title"
              />
              <TextArea
                className={styles.desc}
                inputRef={bountyDescRef}
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
              <CommunicationInput />
              <AmountInput />
              <Button>Create Bounty</Button>
            </section>
          </div>
        </Card>
      </main>
    </>
  );
};
export default CreateBounty;
