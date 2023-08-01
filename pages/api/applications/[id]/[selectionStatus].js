import clientPromise from "../../../utils/mongoConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function applications(req, res) {
  const updateApplicationStatus = async () => {
    const token = req.headers.authorization;
    if (token === undefined) {
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
      return res.status(401).send({
        test: "Error while querying",
      });
    }

    const bountyCollection = db.collection("bounties");
    const applicationCollection = db.collection("applications");

    const appId = new ObjectId(req.query.id);
    console.log(appId, body.bounty_id);

    Promise.all([
      applicationCollection.updateOne(
        { _id: appId },
        { $set: { selectionStatus: true } }
      ),
      bountyCollection.updateOne(
        { _id: body.bounty_id },
        { $set: { bountyStatus: "In Progress" } }
      ),
    ])
      .then((result) => {
        console.log(result);
        res.status(201).send({
          test: "application status changed",
          id: req.query.id,
          data: body,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send({
          test: "Your application status didn't get changed",
        });
      });
  };

  if (req.method === "POST") {
    await updateApplicationStatus();
  } else {
    res.status(400).send({
      test: "invalid request",
    });
  }
}
