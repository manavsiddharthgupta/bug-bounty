import clientPromise from "../../../utils/mongoConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function applications(req, res) {
  const getAllApplication = async () => {
    if (req.query.bountyId) {
      let client = await clientPromise;
      let db = await client.db();
      if (db === null) {
        console.log("error: ", "Database Not Found");
        res.status(401).send({
          test: "Error while querying",
        });
      }
      const collection = db.collection("applications");
      collection
        .find({ bountyId: req.query.bountyId })
        .toArray()
        .then((result) => {
          res.status(200).send({
            test: result,
          });
        })
        .catch(() => {
          res.status(400).send({
            test: "Error while querying",
          });
        });
    } else {
      res.status(400).send({
        test: "invalid bountyID",
      });
    }
  };

  const postAnApplication = async () => {
    const token = req.headers.authorization;
    if (token === "undefined") {
      return res.status(401).send({
        test: "You are not authorized to post a bounty",
      });
    }
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).send({
        test: "You are not authorized to post a bounty",
      });
    }

    const body = req.body;
    let client = await clientPromise;
    let db = await client.db();
    if (db === null) {
      console.log("error: ", "Database Not Found");
      res.status(401).send({
        test: "Error while querying",
      });
    }
    const bountyCollection = db.collection("bounties");
    const applicationCollection = db.collection("applications");

    Promise.all([
      bountyCollection.updateOne(
        { _id: body.applicationData.bountyId },
        { $set: { applicants: body.updatedBountyApplicants } }
      ),
      applicationCollection.insertOne(body.applicationData),
    ])
      .then(() => {
        res.status(201).send({
          test: "Bounty Applicants Updated and Application Posted",
          dataUpdated: body.updatedBountyApplicants,
          dataPosted: body.applicationData,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send({
          test: "Your application didn't get Posted",
        });
      });
  };

  if (req.method === "POST") {
    await postAnApplication();
  } else if (req.method === "GET") {
    await getAllApplication();
  }
}
