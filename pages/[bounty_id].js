import NavBar from "@/components/NavBar";
import Card from "@/ui/Card";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/eachbounty.module.css";
import Tag from "@/ui/Tag";
import Link from "next/link";
import Button from "@/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import BountyDescription from "@/components/BountyDescriptionComponent";
import BountyAllApplication from "@/components/BountyAllApplication";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ApplyModal from "@/ui/ApplyModal";
import { BackGroundModal } from "@/ui/Modal";
import { useSession } from "next-auth/react";
import Chat from "@/components/Chat";
import { getDaySuffix, getMonthName } from "@/utils/dateFormatter";

const EachBounty = ({ eachBounty }) => {
  const [showApplyModal, setShowModal] = useState(false);
  const [allApplications, setBountyApplication] = useState([]);
  const [isLoading, setLoadingState] = useState(true);
  const [yourBounty, setIfyourBounty] = useState(false);
  const router = useRouter();

  const { data, status } = useSession();

  useEffect(() => {
    if (data && data?.user?.email === eachBounty?.openedBy) {
      setIfyourBounty(true);
    }
  }, [data, eachBounty]);

  let disableDiscussionLink = false;
  if (status === "loading" || status === "unauthenticated") {
    disableDiscussionLink = true;
  }

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const currRoute =
    router.query.t === "applications" || router.query.t === "discussions"
      ? `/?t=${router.query.t}`
      : "/";
  const navLinks = [
    { name: "Details", href: "/" },
    { name: "Applications", href: "/?t=applications" },
    { name: "Discussions", href: "/?t=discussions" },
  ];

  let date = new Date(eachBounty.openedOn);
  let postedOn = `${date.getDate()}${getDaySuffix(
    date.getDate()
  )} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;

  const onShowApplyModal = () => {
    setShowModal(true);
  };

  const onHideApplyModal = () => {
    setShowModal(false);
  };

  const onCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Copied to clipboard");
  };

  let mainComponent = <BountyDescription bountyData={eachBounty} />;

  if (router.query.t === "applications") {
    mainComponent = (
      <BountyAllApplication
        bountyAllApplication={allApplications}
        isLoading={isLoading}
        onSetBountyApplication={setBountyApplication}
        onSetLoadingState={setLoadingState}
        checkIfyourBounty={yourBounty}
      />
    );
  } else if (router.query.t === "discussions") {
    mainComponent = <Chat />;
  }

  return (
    <>
      <Head>
        <title>{eachBounty.title}</title>
        <meta name={eachBounty.title} content={eachBounty.subTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <section className={styles.section}>
          <Card>
            <div className={styles.price_status}>
              <h1>Earn {eachBounty.price}</h1>
              <Tag className={styles.tags}>{eachBounty.bountyStatus}</Tag>
            </div>
            <h2 className={styles.title}>{eachBounty.title}</h2>
            <div className={styles.outer_user_data}>
              <div className={styles.user_date}>
                <p className={styles.user_link}>{eachBounty.openedBy}</p>
                <span>Posted On {postedOn}</span>
              </div>
              <div className={styles.share_apply}>
                <FontAwesomeIcon
                  onClick={onCopyUrl}
                  style={{ cursor: "pointer" }}
                  icon={faPaperPlane}
                  className={styles.share_icon}
                />
                {status === "authenticated" && !yourBounty && (
                  <Button
                    className={styles.apply_btn}
                    onClick={onShowApplyModal}
                  >
                    Apply
                  </Button>
                )}
              </div>
            </div>
            <div className={styles.navlinks}>
              {navLinks.map((link) => {
                return (
                  <Link
                    key={link.name}
                    className={
                      link.href === currRoute ? styles.actlinks : styles.links
                    }
                    href={router.query.bounty_id + link.href}
                    style={
                      disableDiscussionLink && link.name === "Discussions"
                        ? { pointerEvents: "none", color: "GrayText" }
                        : {}
                    }
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <div className={styles.mainSection}>{mainComponent}</div>
          </Card>
        </section>
      </main>
      {showApplyModal &&
        status === "authenticated" &&
        createPortal(
          <ApplyModal
            totalApplicants={eachBounty.applicants}
            onSetCloseModal={onHideApplyModal}
            onSetBountyApplication={setBountyApplication}
            user_data={data}
          />,
          document.getElementById("modal")
        )}
      {showApplyModal &&
        status === "authenticated" &&
        createPortal(
          <BackGroundModal onSetCloseModal={onHideApplyModal} />,
          document.getElementById("modal")
        )}
    </>
  );
};

export default EachBounty;

export async function getStaticPaths() {
  // temporary code (need to implement error handling) -----
  const res = await fetch("http://localhost:3002/bounties");
  const data = await res.json();
  const paths = data.test.map((bounty) => {
    return {
      params: { bounty_id: `${bounty._id}` },
    };
  });
  return {
    paths: paths.slice(0, 3),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // temporary code (need to implement error handling) -----
  const { params } = context;
  const res = await fetch(`http://localhost:3002/bounties/${params.bounty_id}`);
  const data = await res.json();

  if (!data.bountyData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      eachBounty: data.bountyData,
    },
  };
}

// useTwitter Api to share the link as a tweet
