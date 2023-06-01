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
import { BackGroundModal } from "@/ui/Modal";
import CreateBountyModal from "@/components/CreateBountyModal";
import { useSession } from "next-auth/react";

const bountyReducerFunc = (state, action) => {
  if (action.type === "SET_ALL_BOUNTY") {
    // ---Logic

    return {
      ...state,
      bountyType: action.payload.bountyType,
      pageTitle: action.payload.pageTitle,
    };
  } else if (action.type === "SET_POSTED_BOUNTY") {
    // ---Logic

    return {
      ...state,
      bountyType: action.payload.bountyType,
      pageTitle: action.payload.pageTitle,
    };
  } else if (action.type === "SET_ASSIGNED_BOUNTY") {
    // ---Logic

    return {
      ...state,
      bountyType: action.payload.bountyType,
      pageTitle: action.payload.pageTitle,
    };
  } else if (action.type === "RE_FETCH_BOUNTY") {
    // ---Logic

    return {
      ...state,
      fetchedBounty: action.payload.fetchedBounty,
    };
  } else {
    return {
      ...state,
    };
  }
};

export default function Home({ allBounties }) {
  const bountyTypeInitialState = {
    bountyType: "",
    pageTitle: "",
    fetchedBounty: Array.isArray(allBounties) ? allBounties : [],
  };

  const [bountiesType, DispatchBountyTypefunc] = useReducer(
    bountyReducerFunc,
    bountyTypeInitialState
  );
  const [showCreateBountyModal, setModalState] = useState(false);
  const [isLoading, setLoadingState] = useState(false);
  const [error, setError] = useState(null);

  const { data, status } = useSession();

  console.log(data);
  const router = useRouter();

  useEffect(() => {
    const fetchAllBounty = async () => {
      setLoadingState(true);
      const res = await fetch("http://localhost:3002/bounties");
      if (!res.ok) {
        setError("Error while fetching data");
        setLoadingState(false);
        return;
      }
      const data = await res.json();
      DispatchBountyTypefunc({
        type: "RE_FETCH_BOUNTY",
        payload: {
          fetchedBounty: data.test,
        },
      });
      setLoadingState(false);
    };
    fetchAllBounty();
  }, []);

  useEffect(() => {
    // use to make page more dynamic base on query parameter ----

    if (router.query.t === "myposted") {
      DispatchBountyTypefunc({
        type: "SET_POSTED_BOUNTY",
        payload: {
          bountyType: "myposted",
          pageTitle: "My Posted Bounty",
          fetchedBounty: [],
        },
      });
    } else if (router.query?.t === "assigned") {
      DispatchBountyTypefunc({
        type: "SET_ASSIGNED_BOUNTY",
        payload: {
          bountyType: "assigned",
          pageTitle: "My Assigned Bounty",
          fetchedBounty: [],
        },
      });
    } else {
      DispatchBountyTypefunc({
        type: "SET_ALL_BOUNTY",
        payload: {
          bountyType: "all",
          pageTitle: "All Bounty",
          fetchedBounty: [],
        },
      });
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
              {status === "authenticated" && (
                <Button onClick={onHandleCreateButton} className={styles.btn}>
                  <FontAwesomeIcon
                    style={{
                      marginRight: "0.25rem",
                    }}
                    icon={faAdd}
                  />
                  create bounty
                </Button>
              )}
            </div>
          </Card>

          <AllBounties
            isLoading={isLoading}
            err={error}
            allBountyData={bountiesType.fetchedBounty}
          />
        </section>
      </main>
      {showCreateBountyModal &&
        createPortal(<CreateBountyModal />, document.getElementById("modal"))}
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
  const res = await fetch("http://localhost:3002/bounties");
  const data = await res.json();
  // console.log(data);
  // if (!Array.isArray(data.test)) {
  //   return {
  //     notFound: true,
  //   };
  // }
  return {
    props: {
      allBounties: data.test,
    },
    revalidate: 2,
  };
}
