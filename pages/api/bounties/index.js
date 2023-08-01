import clientPromise from "../../../utils/mongoConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const getAllBounty = async (req, res) => {
  try {
    if (req.query.type === "myposted") {
      return res.status(200).json({
        message: "My posted bounties",
      });
    } else if (req.query.type === "assigned") {
      return res.status(200).json({
        message: "Assigned bounties",
      });
    } else {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("bounties");
      const data = await collection.find().toArray();
      return res.status(200).json({
        message: data,
      });
    }
  } catch (err) {
    console.error("Error occurred:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const postBounty = async (req, res) => {
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
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("bounties");
    const result = await collection.insertOne(body);
    return res.status(201).json({
      message: "Bounty posted",
      dataPosted: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    postBounty(req, res);
  } else {
    getAllBounty(req, res);
  }
}
