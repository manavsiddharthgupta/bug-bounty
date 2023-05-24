import { useCallback, useEffect, useState } from "react";
import styles from "../styles/BountyAllApplication.module.css";
import BountyApplication from "./BountyEachApplication";
import { useRouter } from "next/router";

const BountyAllApplication = ({
  bountyAllApplication,
  isLoading,
  onSetBountyApplication,
  onSetLoadingState,
}) => {
  console.log(bountyAllApplication);

  const router = useRouter();

  const fetchBountyApplication = useCallback(async () => {
    onSetLoadingState(true);
    const res = await fetch(
      `http://localhost:3002/applications?bountyId=${router.query.bounty_id}`
    );
    const data = await res.json();
    onSetBountyApplication(data.test);
    console.log("All BountyAllApplication");
    onSetLoadingState(false);
  }, []);

  useEffect(() => {
    fetchBountyApplication();
  }, [fetchBountyApplication]);

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
                key={
                  bountyEachApplication._id
                    ? bountyEachApplication._id
                    : bountyEachApplication.applicationEmail
                }
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
