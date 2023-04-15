import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { createPortal } from "react-dom";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import styles from "../styles/home.module.css";
import BountyServices from "@/components/BountyServices";
import AllBounties from "@/components/AllBounties";
import PageTitle from "@/components/PageTitle";
import Card from "@/ui/Card";
import Button from "@/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Modal, BackGroundModal } from "@/ui/Modal";

const bountyTypeInitialState = {
  bountyType: "all",
  pageTitle: "",
  allBounty: [],
  myPostedBounty: [],
  assignedBounty: [],
};

const bountyReducerFunc = (state, action) => {
  if (action.type === "TYPE") {
    // ----Logic

    return {
      ...state,
      bountyType: action.payload,
    };
  } else if (action.type === "PAGE_TITLE") {
    // ---Logic

    return {
      ...state,
      pageTitle: action.payload,
    };
  } else if (action.type === "SET_ALL_BOUNTY") {
    // ---Logic

    return {};
  } else if (action.type === "SET_POSTED_BOUNTY") {
    // ---Logic

    return {};
  } else if (action.type === "SET_ASSIGNED_BOUNTY") {
    // ---Logic

    return {};
  } else {
    return {
      ...state,
    };
  }
};

export default function Home({ allBounties }) {
  const [bountiesType, DispatchBountyTypefunc] = useReducer(
    bountyReducerFunc,
    bountyTypeInitialState
  );
  const [showCreateBountyModal, setModalState] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // use to make page more dynamic base on query parameter ----

    if (router.query?.t === "myposted") {
      DispatchBountyTypefunc({ type: "TYPE", payload: "myposted" });
      DispatchBountyTypefunc({
        type: "PAGE_TITLE",
        payload: "My Posted Bount",
      });
    } else if (router.query?.t === "assigned") {
      DispatchBountyTypefunc({ type: "TYPE", payload: "assigned" });
      DispatchBountyTypefunc({
        type: "PAGE_TITLE",
        payload: "My Assigned Bounty",
      });
    } else {
      DispatchBountyTypefunc({ type: "TYPE", payload: "all" });
      DispatchBountyTypefunc({ type: "PAGE_TITLE", payload: "All Bounty" });
    }
  }, [router.query?.t]);

  const onHandleCreateButton = () => {
    setModalState(true);
  };

  const onCloseModal = () => {
    setModalState(false);
  };

  return (
    <>
      <Head>
        <title>Bug Bounty</title>
        <meta name="Displays Bounties" content={bountiesType.pageTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <section className={styles.section}>
          {bountiesType.bountyType === "all" && <BountyServices />}
          <Card>
            <div className={styles.pageTitle_button}>
              <PageTitle>{bountiesType.pageTitle}</PageTitle>
              <Button onClick={onHandleCreateButton} className={styles.btn}>
                <FontAwesomeIcon
                  style={{
                    marginRight: "0.25rem",
                  }}
                  icon={faAdd}
                />
                create bounty
              </Button>
            </div>
          </Card>
          <AllBounties allBountyData={allBounties} />
        </section>
      </main>
      {showCreateBountyModal &&
        createPortal(<Modal />, document.getElementById("modal"))}
      {showCreateBountyModal &&
        createPortal(
          <BackGroundModal onSetCloseModal={onCloseModal} />,
          document.getElementById("modal")
        )}
    </>
  );
}

export async function getStaticProps(context) {
  // temprorary code need changes (error handling not implemented) ----
  const res = await fetch("http://localhost:3004/api-bounties");
  const data = await res.json();
  return {
    props: {
      allBounties: data,
    },
  };
}
