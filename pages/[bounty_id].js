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

const EachBounty = ({ eachBounty }) => {
  const router = useRouter();
  console.log(eachBounty);
  const currRoute = router.query.t ? `/?t=${router.query.t}` : "/";
  const navLinks = [
    { name: "Details", href: "/" },
    { name: "Applications", href: "/?t=applications" },
    { name: "Discussions", href: "/?t=discussions" },
  ];
  return (
    <>
      <Head>
        <title>Bug Bounty</title>
        <meta name="Bounty Deatils" content="See Details About Bounty" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <section className={styles.section}>
          <Card>
            <div className={styles.price_status}>
              <h1>Earn {eachBounty.price}</h1>
              <Tag className={styles.tags}>{eachBounty.status}</Tag>
            </div>
            <h2 className={styles.title}>{eachBounty.title}</h2>
            <div className={styles.outer_user_data}>
              <div className={styles.user_date}>
                <Link
                  className={styles.user_link}
                  href={`/${router.query.bounty_id}`} // link will get changed
                  passHref
                >
                  @{eachBounty.openedBy}
                </Link>
                <span>Posted On {eachBounty.openedOn}</span>
              </div>
              <div className={styles.share_apply}>
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  icon={faPaperPlane}
                />
                <Button>Apply</Button>
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
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <div className={styles.mainSection}>
              <h3>Bounty Description</h3>
              <div className={styles.bountyDesc}></div>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
};

export default EachBounty;

export async function getStaticPaths() {
  // temporary code (need to implement error handling) -----
  const res = await fetch("http://localhost:3004/api-bounties");
  const data = await res.json();
  const paths = data.map((bounty) => {
    return {
      params: { bounty_id: `${bounty.id}` },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // temporary code (need to implement error handling) -----
  const { params } = context;
  const res = await fetch(
    `http://localhost:3004/api-bounties/${params.bounty_id}`
  );
  const data = await res.json();

  return {
    props: {
      eachBounty: data,
    },
  };
}
