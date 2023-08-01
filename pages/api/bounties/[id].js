import clientPromise from "../../../utils/mongoConnect";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();
    if (db === null) {
      console.log("error: ", "Database Not Found");
      return res.status(500).json({
        message: "Error while querying",
      });
    }

    const { query } = req;
    const { id } = query;
    const collection = db.collection("bounties");

    const result = await collection.findOne({ _id: id });
    if (result) {
      console.log(result);
      return res.status(200).json({
        id: id,
        bountyData: result,
      });
    } else {
      return res.status(404).json({
        message: "Bounty not found",
      });
    }
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      message: "Error while querying",
    });
  }
}
