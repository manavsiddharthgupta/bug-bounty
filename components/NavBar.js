import styles from "../styles/navbar.module.css";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={styles.outer_nav}>
      <div className={styles.nav}>
        <h1>Bug Bounty</h1>
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
      </div>
    </nav>
  );
};

export default NavBar;
