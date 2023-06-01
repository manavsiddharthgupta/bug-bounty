import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

export const bountyDataformat = (
  title,
  subTitle,
  description,
  tags,
  requiredSkills,
  lastSubmissionDate,
  githubLink,
  figmaLink,
  communicationLink,
  amount,
  bountytype,
  email
) => {
  const date = new Date().toISOString();
  console.log(date);

  const otherLinks = communicationLink.map((each) => {
    const typo = {};
    typo[each.type] = each.link;
    return typo;
  });
  const createbountyformattedData = {
    _id: uuidv4(),
    price: `₹ ${amount}`,
    title: title,
    tags: tags,
    subTitle: subTitle,
    requiredSkills: requiredSkills,
    openedBy: email,
    openedOn: date,
    applicants: 0,
    bountyStatus: "open",
    lastSubmissionDate: lastSubmissionDate,
    description: description,
    links: {
      githubLink: githubLink,
      figmaLink: figmaLink,
      others: otherLinks,
    },
    bountyType: bountytype,
  };
  console.log(createbountyformattedData);
  return createbountyformattedData;
};
