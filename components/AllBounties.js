import Card from "@/ui/Card";
import styles from "../styles/allbounties.module.css";
import FilterComponent from "./FilterComponent";
import Bounty from "./Bounty";
import Link from "next/link";

const AllBounties = ({ allBountyData }) => {
  let allBountyComponent = allBountyData.map((each) => {
    return (
      <Link key={each._id} href={`/${each._id}`}>
        <Bounty eachBountyData={each} />
      </Link>
    );
  });

  if (allBountyData.length < 1) {
    // Temporary UI ----
    allBountyComponent = <p>No Available Data</p>;
  }
  return (
    <Card>
      <div className={styles.bounty_parent_div}>
        <FilterComponent />
        {allBountyComponent}
      </div>
    </Card>
  );
};

export default AllBounties;
