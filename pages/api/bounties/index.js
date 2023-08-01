import clientPromise from "../../../utils/mongoConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function bounty(req, res) {
  const getAllBounty = async () => {
    if (req.query.type === "myposted") {
      res.status(200).send({
        test: "my posted bounties",
      });
    } else if (req.query.type === "assigned") {
      res.status(200).send({
        test: "assigned bounties",
      });
    } else {
      let client = await clientPromise;
      let db = await client.db();
      if (db === null) {
        console.log("error: ", "Database Not Found");
        res.status(401).send({
          test: { err: "No DataBase not found" },
        });
      }
      const collection = db.collection("bounties");
      collection
        .find()
        .toArray()
        .then((data) => {
          // console.log(data);
          res.status(200).send({
            test: data,
          });
        })
        .catch((err) => {
          res.status(401).send({
            test: { err: "Not Bounties Found" },
          });
        });
    }
  };

  const postBounty = async () => {
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
    const collection = db.collection("bounties");
    collection
      .insertOne(body)
      .then((result) => {
        res.status(201).send({
          test: "bounty posted",
          dataPosted: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send({
          test: "Your bounty didn't get posted",
        });
      });
  };

  if (req.method === "POST") {
    await postBounty();
  } else {
    await getAllBounty();
  }
}
