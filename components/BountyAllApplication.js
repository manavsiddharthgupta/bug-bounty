import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/BountyAllApplication.module.css";
import BountyApplication from "./BountyEachApplication";
import { useRouter } from "next/router";
import ErrorComponent from "@/ui/ErrorComponent";
import Loading from "@/ui/Loading";

const BountyAllApplication = ({
  bountyAllApplication,
  isLoading,
  onSetBountyApplication,
  onSetLoadingState,
  checkIfyourBounty,
  userData,
}) => {
  const [error, setError] = useState(null);
  const [isSelected, setSelected] = useState(null);
  const [isSelectedLoading, setLoading] = useState(false);
  const router = useRouter();

  const fetchBountyApplication = useCallback(async () => {
    onSetLoadingState(true);
    setError(null);
    try {
      const res = await fetch(
        `https://bug-bounty-backend.vercel.app/applications?bountyId=${router.query.bounty_id}`
      );
      if (!res.ok) {
        throw Error("Error While querying data");
      }
      const data = await res.json();
      data.test.forEach((eachData) => {
        if (eachData?.selectionStatus) {
          setSelected(eachData._id);
        }
      });
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

  const onSelectHandler = (id) => {
    console.log("update the status");
    setLoading(true);

    const applicationStatusData = {
      bounty_id: router.query.bounty_id,
      bountyStatus: "In Progress",
    };

    const selectionStatus = true;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${userData?.accessToken}`,
    };

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(applicationStatusData),
    };

    fetch(
      `https://bug-bounty-backend.vercel.app/applications/${id}/${selectionStatus}`,
      options
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Your Bounty could not be posted");
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setSelected(id);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
                showSelectButton={checkIfyourBounty}
                isSelectedBtnLoading={isSelectedLoading}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default BountyAllApplication;
