import { useEffect, useState } from "react";
import styles from "../styles/BountyAllApplication.module.css";
import BountyApplication from "./BountyEachApplication";
import { useRouter } from "next/router";

const BountyAllApplication = () => {
  const [bountyAllApplication, setBountyApplication] = useState([]);
  const [isLoading, setLoadingState] = useState(true);

  console.log(bountyAllApplication);

  const router = useRouter();

  useEffect(() => {
    const fetchBountyApplication = async () => {
      const res = await fetch(
        `http://localhost:3002/applications?bountyId=${router.query.bounty_id}`
      );
      const data = await res.json();
      setBountyApplication(data.test);
      console.log("All BountyAllApplication");
      setLoadingState(false);
    };
    fetchBountyApplication();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h1>Applications</h1>
      <div className={styles.allapplication_outer_div}>
        {bountyAllApplication.length === 0 ? (
          <p>No Applicants</p>
        ) : (
          bountyAllApplication.map((bountyEachApplication) => {
            return (
              <BountyApplication
                key={bountyEachApplication._id}
                applicationData={bountyEachApplication}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default BountyAllApplication;
