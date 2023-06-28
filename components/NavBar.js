import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/styles/navbar.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const { data, status } = useSession();

  return (
    <nav className={styles.outer_nav}>
      <div className={styles.nav}>
        <Link className={styles.navTitle} href="/">Bug Bounty🪲 </Link>
        {status === "authenticated" && (
          <ul>
            <li>
              <Link href="/">All Bounties</Link>
            </li>
            <li>
              <Link href="/?t=myposted">Bounty I've Posted</Link>
            </li>
            <li>
              <Link href="/?t=assigned">Assigned Bounty</Link>
            </li>
          </ul>
        )}
        <div className={styles.authNav}>
          {status === "authenticated" && (
            <h2 onClick={signOut} className={styles.authBtn}>
              Sign out
            </h2>
          )}
          {status === "unauthenticated" && (
            <h2 onClick={signIn} className={styles.authBtn}>
              Sign in
            </h2>
          )}
          <FontAwesomeIcon className={styles.bars} icon={faBars} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
