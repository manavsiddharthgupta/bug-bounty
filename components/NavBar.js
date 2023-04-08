import styles from "../styles/navbar.module.css";
const NavBar = () => {
  return (
    <nav className={styles.outer_nav}>
      <div className={styles.nav}>
        <h1>Bug Bounty</h1>
        <ul>
          <li>All Bounties</li>
          <li>Bounty I've Posted</li>
          <li>Assigned Bounty</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
