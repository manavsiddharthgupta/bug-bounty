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
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loading from "@/ui/Loading";
import Feedback from "@/ui/Feedback";

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
  const [isTagTouched, setTagTouched] = useState(false);
  const [isSkillTouched, setSkillTouched] = useState(false);
  const [isCommunicationTouched, setCommunicationTouched] = useState(false);

  let isTagValid = tags.length > 0 && tags.length < 6;
  let isSkillValid = skillRequired.length > 0 && skillRequired.length < 6;
  let isCommunicationValid = communicationLink.every(({ type, link }) => {
    if (type === "Discord") {
      return /^[a-zA-Z0-9_-]{2,32}$/.test(link);
    }

    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(link);
  });

  const onTagBlurHandler = () => {
    setTagTouched(true);
  };

  const onSkillBlurHandler = () => {
    setSkillTouched(true);
  };

  // custom hooks
  const {
    inputValue: bountyTitleValue,
    isValueValid: isTitleValid,
    isTouched: isTitleTouch,
    setBlurHandler: setTitleBlurHandler,
    onChangeHandler: onChangeTitleHandler,
  } = useInputState((value) => {
    return value.length > 12;
  });

  const {
    textState: bountySubTitleValue,
    isValueValid: isSubtitleValid,
    isTouched: isSubTitleTouch,
    setBlurHandler: setSubTitleBlurHandler,
    onChangeHandler: onChangeSubTitleHandler,
  } = useTextAreaState(null, (value) => {
    return value.length > 20;
  });

  const {
    textState: bountyDescriptionValue,
    isValueValid: isDescriptionValid,
    isTouched: isDescriptionTouch,
    setBlurHandler: setDescriptionBlurHandler,
    onChangeHandler: onChangeDescriptionHandler,
  } = useTextAreaState(createBountyType?.descStruc, (value) => {
    return value.length > 40;
  });

  const {
    inputValue: bountyCompleteDateValue,
    isValueValid: isBountyCompleteDateValid,
    isTouched: isBountyCompleteDateTouch,
    setBlurHandler: setBountyCompleteDateBlurHandler,
    onChangeHandler: onChangeBountyCompleteDateHandler,
  } = useInputState((value) => {
    return value.length > 0;
  });

  const {
    inputValue: bountyGithubLinkValue,
    isValueValid: isGithubLinkValid,
    isTouched: isGithubLinkTouch,
    setBlurHandler: setBountyGithubLinkBlurHandler,
    onChangeHandler: onChangeBountyGithubLinkHandler,
  } = useInputState((value) => {
    let githubLinkRegex = /^(https?:\/\/)?(www\.)?github\.com\/.+/;
    return githubLinkRegex.test(value);
  });

  const {
    inputValue: bountyFigmaLinkValue,
    setBlurHandler: setBountyFigmaLinkBlurHandler,
    onChangeHandler: onChangeBountyFigmaLinkHandler,
  } = useInputState((value) => {
    const figmaLinkRegex =
      /^(https?:\/\/)?(www\.)?figma\.com\/(file|proto)\/.+\/.+/;
    return figmaLinkRegex.test(value);
  });

  const [isLoading, setLoading] = useState(false);

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

  const { data: user_data, status } = useSession();
  const email = user_data?.user?.email;

  if (status === "loading") {
    return <Loading />;
  } else if (status === "unauthenticated") {
    return <ErrorComponent>You are not authorized</ErrorComponent>;
  }

  // functions
  const onCreateBountyFunc = () => {
    let figmaLink = null;
    if (router.query.type === "web-app") {
      figmaLink = bountyFigmaLinkValue;
    }
    if (
      isTitleValid &&
      isSubtitleValid &&
      isDescriptionValid &&
      isTagValid &&
      isSkillValid &&
      isBountyCompleteDateValid &&
      isGithubLinkValid &&
      isCommunicationValid
    ) {
      const data = bountyDataformat(
        bountyTitleValue,
        bountySubTitleValue,
        bountyDescriptionValue,
        tags,
        skillRequired,
        bountyCompleteDateValue,
        bountyGithubLinkValue,
        figmaLink,
        communicationLink,
        amount,
        router.query.type,
        email
      );

      const accessToken = user_data?.accessToken;
      console.log(accessToken);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      };

      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      };

      setLoading(true);
      fetch("http://localhost:3002/bounties", options)
        .then((res) => {
          if (!res.ok) {
            throw Error("Your Bounty could not be posted");
          }
          return res.json();
        })
        .then((result) => {
          console.log(result);
          router.push("/");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      return;
    }
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

  const onPopTag = () => {
    console.log("pop");
    setTags((state) => {
      const newState = [...state];
      newState.pop();

      return [...newState];
    });
  };

  const onPopReqSkills = () => {
    setSkillRequired((state) => {
      const newState = [...state];
      newState.pop();

      return [...newState];
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
            <Link href="/" className={styles.back_btn}>
              <p>&larr;</p>
              <p>back to all bounties</p>
            </Link>
            <h1>Create a Bounty</h1>
            <section>
              <Input
                inputValue={bountyTitleValue}
                onBlur={setTitleBlurHandler}
                label="Bounty Title"
                type="text"
                onChange={onChangeTitleHandler}
              />
              {!isTitleValid && isTitleTouch && (
                <Feedback>
                  Your title should contains atleast 12 character
                </Feedback>
              )}
              <TextArea
                value={bountySubTitleValue}
                onChange={onChangeSubTitleHandler}
                className={styles.subTitle}
                onBlur={setSubTitleBlurHandler}
                label="Sub Title"
              />
              {!isSubtitleValid && isSubTitleTouch && (
                <Feedback>
                  Your title should contains atleast 20 character
                </Feedback>
              )}
              <TextArea
                value={bountyDescriptionValue}
                onChange={onChangeDescriptionHandler}
                className={styles.desc}
                onBlur={setDescriptionBlurHandler}
                label="Description"
              />
              {!isDescriptionValid && isDescriptionTouch && (
                <Feedback>
                  Your title should contains atleast 40 character
                </Feedback>
              )}
              <InputTags
                createfunc={onCreateTag}
                popfunc={onPopTag}
                label="Tags"
                tagsData={tags}
                placeholder="Write required tags"
                onBlur={onTagBlurHandler}
              />
              {!isTagValid && isTagTouched && (
                <Feedback>
                  There should be minimum 1 tag and maximum 6 tags
                </Feedback>
              )}
              <InputTags
                createfunc={onCreateReqSkills}
                popfunc={onPopReqSkills}
                label="Required Skills"
                tagsData={skillRequired}
                placeholder="Write required skills"
                onBlur={onSkillBlurHandler}
              />
              {!isSkillValid && isSkillTouched && (
                <Feedback>
                  There should be minimum 1 and maximum 6 required skills
                </Feedback>
              )}
              <Input
                inputValue={bountyCompleteDateValue}
                onBlur={setBountyCompleteDateBlurHandler}
                label="Bounty Completition Date"
                type="date"
                onChange={onChangeBountyCompleteDateHandler}
              />
              {!isBountyCompleteDateValid && isBountyCompleteDateTouch && (
                <Feedback>Inavlid date input</Feedback>
              )}
              <Input
                inputValue={bountyGithubLinkValue}
                onBlur={setBountyGithubLinkBlurHandler}
                label="Github Repository Link"
                type="text"
                onChange={onChangeBountyGithubLinkHandler}
              />
              {!isGithubLinkValid && isGithubLinkTouch && (
                <Feedback>Inavlid github link</Feedback>
              )}
              {router.query.type === "web-app" && (
                <Input
                  inputValue={bountyFigmaLinkValue}
                  onBlur={setBountyFigmaLinkBlurHandler}
                  label="Figma File Link"
                  type="text"
                  onChange={onChangeBountyFigmaLinkHandler}
                />
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
              <AmountInput
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <Button
                makeDisabled={isLoading ? true : false}
                className={styles.createBtn}
                onClick={onCreateBountyFunc}
              >
                Create Bounty
              </Button>
            </section>
          </div>
        </Card>
      </main>
    </>
  );
};
export default CreateBounty;

// content change based on types which will reflects on bounty details page
// set min amount i.e > 0
// date validation i.e date should be greater than today
