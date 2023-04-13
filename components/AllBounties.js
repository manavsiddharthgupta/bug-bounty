import Card from "@/ui/Card";
import styles from "../styles/allbounties.module.css";
import FilterComponent from "./FilterComponent";
import Bounty from "./Bounty";

const AllBounties = () => {
  return (
    <Card>
      <div className={styles.bounty_parent_div}>
        <FilterComponent />
        <Bounty />
        <Bounty />
        <Bounty />
        <Bounty />
      </div>
    </Card>
  );
};

export default AllBounties;
