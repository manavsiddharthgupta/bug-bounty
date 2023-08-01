import clientPromise from "@/utils/mongoConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ObjectId } from "mongodb";

const updateApplicationStatus = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token === undefined) {
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

    const appId = new ObjectId(req.query.id);

    await Promise.all([
      applicationCollection.updateOne(
        { _id: appId },
        { $set: { selectionStatus: true } }
      ),
      bountyCollection.updateOne(
        { _id: body.bounty_id },
        { $set: { bountyStatus: "In Progress" } }
      ),
    ]);

    return res.status(201).json({
      message: "Application status changed",
      id: req.query.id,
      data: body,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Your application status didn't get changed",
    });
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    await updateApplicationStatus(req, res);
  } else {
    res.status(400).json({
      message: "Invalid request",
    });
  }
}
