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
  bountytype
) => {
  const date = new Date().toISOString();
  console.log(date);
  const createbountyformattedData = {
    id: uuidv4(),
    price: `₹ ${amount}`,
    title: title,
    tags: tags,
    subTitle: subTitle,
    requiredSkills: requiredSkills,
    openedBy: "johndoe",
    openedOn: date,
    applicants: 0,
    lastSubmissionDate: lastSubmissionDate,
    description: description,
    links: {
      githubLink: githubLink,
      figmaLink: figmaLink,
      others: communicationLink,
    },
    bountyType: bountytype,
  };
  console.log(createbountyformattedData);
};
