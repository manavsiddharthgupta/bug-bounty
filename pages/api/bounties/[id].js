import clientPromise from "../../../utils/mongoConnect";

export default async function getOneBounty(req, res) {
  let client = await clientPromise;
  let db = await client.db();
  if (db === null) {
    console.log("error: ", "Database Not Found");
    res.status(401).send({
      test: "Error while querying",
    });
  }
  const { query } = req;
  const { id } = query;
  const collection = db.collection("bounties");
  collection
    .find({ _id: id })
    .next()
    .then((result) => {
      console.log(result);
      res.status(200).send({
        id: id,
        bountyData: result,
      });
    })
    .catch((err) => {
      console.log("error", err);
      res.status(401).send({
        test: "Error while querying",
      });
    });
}
