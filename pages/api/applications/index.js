import clientPromise from "../../../utils/mongoConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const getAllApplication = async (req, res) => {
  try {
    if (!req.query.bountyId) {
      return res.status(400).json({
        message: "Invalid bountyID",
      });
    }

    const client = await clientPromise;
    const db = client.db();
    if (!db) {
      console.log("error: ", "Database Not Found");
      return res.status(500).json({
        message: "Error while querying",
      });
    }

    const collection = db.collection("applications");
    const result = await collection
      .find({ bountyId: req.query.bountyId })
      .toArray();
    return res.status(200).json({
      test: result,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    return res.status(500).json({
      error: "Error while querying",
    });
  }
};

const postAnApplication = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token === "undefined") {
      return res.status(401).json({
        message: "You are not authorized to post a bounty",
      });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        message: "You are not authorized to post a bounty",
      });
    }

    const body = req.body;
    const client = await clientPromise;
    const db = client.db();
    if (!db) {
      console.log("error: ", "Database Not Found");
      return res.status(500).json({
        message: "Error while querying",
      });
    }

    const bountyCollection = db.collection("bounties");
    const applicationCollection = db.collection("applications");

    const updateBountyPromise = bountyCollection.updateOne(
      { _id: body.applicationData.bountyId },
      { $set: { applicants: body.updatedBountyApplicants } }
    );

    const insertApplicationPromise = applicationCollection.insertOne(
      body.applicationData
    );

    await Promise.all([updateBountyPromise, insertApplicationPromise]);

    return res.status(201).json({
      message: "Bounty Applicants Updated and Application Posted",
      dataUpdated: body.updatedBountyApplicants,
      dataPosted: body.applicationData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Your application didn't get Posted",
    });
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    await postAnApplication(req, res);
  } else if (req.method === "GET") {
    await getAllApplication(req, res);
  } else {
    res.status(405).json({
      message: "Method Not Allowed",
    });
  }
}
