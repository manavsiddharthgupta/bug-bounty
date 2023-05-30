import { useCallback, useEffect, useState } from "react";
import styles from "../styles/BountyAllApplication.module.css";
import BountyApplication from "./BountyEachApplication";
import { useRouter } from "next/router";
import ErrorComponent from "@/ui/ErrorComponent";
import Loading from "@/ui/Loading";

const BountyAllApplication = ({
  bountyAllApplication,
  isLoading,
  onSetBountyApplication,
  onSetLoadingState,
}) => {
  const [error, setError] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [showSelectBtn, setToshowSelectButton] = useState(false);
  const router = useRouter();

  const fetchBountyApplication = useCallback(async () => {
    onSetLoadingState(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:3002/applications?bountyId=${router.query.bounty_id}`
      );
      if (!res.ok) {
        throw Error("Error While querying data");
      }
      const data = await res.json();
      onSetBountyApplication(data.test);
      onSetLoadingState(false);
    } catch (err) {
      console.log(err);
      onSetLoadingState(false);
      setError("Error while querying data");
    }
  }, []);

  useEffect(() => {
    fetchBountyApplication();
  }, [fetchBountyApplication]);

  if (isLoading) return <Loading />;

  if (error) return <ErrorComponent>{error}</ErrorComponent>;

  const onSelectHandler = () => {
    setSelected(true);
  };

  return (
    <>
      <h1>Applications</h1>
      <div className={styles.allapplication_outer_div}>
        {bountyAllApplication.length === 0 ? (
          <p className={styles.no_applicants}>No Applicants</p>
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
                isSelected={isSelected}
                onSetSelected={onSelectHandler}
                showSelectButton={showSelectBtn}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default BountyAllApplication;
