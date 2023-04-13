import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export default function Home() {
  const [bountyType, setBountyType] = useState("all");
  const [pageTitle, setTitle] = useState("all");
  const [showCreateBountyModal, setModalState] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query?.t === "myposted") {
      setBountyType("myposted");
      setTitle("My Posted Bounty");
    } else if (router.query?.t === "assigned") {
      setBountyType("assigned");
      setTitle("My Assigned Bounty");
    } else {
      setBountyType("all");
      setTitle("All Bounty");
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
        <meta name="Displays Bounties" content={pageTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <section className={styles.section}>
          {bountyType === "all" && <BountyServices />}
          <Card>
            <div className={styles.pageTitle_button}>
              <PageTitle>{pageTitle}</PageTitle>
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
          <AllBounties />
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
