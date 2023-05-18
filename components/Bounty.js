import Tag from "@/ui/Tag";
import styles from "../styles/bounty.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Bounty = ({ eachBountyData }) => {
  const date = new Date(eachBountyData.openedOn);
  let postedOn = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  return (
    <div className={styles.bounty}>
      <div className={styles.bounty_price_status_outer}>
        <h1 className={styles.bounty_price}>{eachBountyData.price}</h1>
        <Tag>{eachBountyData.bountyStatus}</Tag>{" "}
        {/*  change color according to status */}
      </div>
      <div className={styles.bounty_title}>
        <h2>{eachBountyData.title}</h2>
        <div>
          {/* random change color */}
          {eachBountyData.tags.map((eachtag) => {
            return (
              <Tag key={eachtag} className={styles.bounty_status}>
                {eachtag}
              </Tag>
            );
          })}
        </div>
      </div>
      <p className={styles.bounty_subTitle}>{eachBountyData.subTitle}</p>
      <span className={styles.bounty_reqskills_title}>Skills Required : </span>
      <span className={styles.bounty_reqskills_title}>
        {eachBountyData.requiredSkills.reduce(
          (accumulator, currentSkill, index) => {
            if (eachBountyData.requiredSkills.length - 1 === index) {
              return accumulator + currentSkill;
            }
            return accumulator + `${currentSkill}, `;
          },
          ""
        )}
      </span>
      <div className={styles.extra_inf}>
        <p>
          opened on {postedOn} by @{eachBountyData.openedBy}
        </p>
        <div>
          <FontAwesomeIcon className={styles.user_icon} icon={faUser} />
          <span>{eachBountyData.applicants} Applicants</span>
        </div>
      </div>
    </div>
  );
};

export default Bounty;

// {
//   "_id": "aaf576f5-840c-4c47-b9c6-bc4b6e6f9d6f",
//   "price": "₹ 1500",
//   "title": "Develop a real-time chat application with WebSocket",
//   "tags": ["Web Development", "Chat Application", "Real-time Communication"],
//   "subTitle": "Enable instant messaging and collaboration with our WebSocket-based chat application",
//   "requiredSkills": ["JavaScript", "Node.js", "WebSocket"],
//   "openedBy": "Michael Brown",
//   "openedOn": "2023-05-18T07:53:55.015Z",
//   "applicants": 3,
//   "bountyStatus": "open",
//   "lastSubmissionDate": "2023-06-25",
//   "description": "Problem Description:\n\nDevelop a real-time chat application using WebSocket technology. The application should support instant messaging, group chats, and online presence status. Additionally, the chat should be scalable and efficient.\n\nAcceptance Criteria:\n- Implement user authentication and authorization for secure communication.\n- Create chat rooms with support for multiple users.\n- Enable real-time updates and notifications.\n\nTimelines / Milestones:\n- Planning and architecture: 1 week\n- Front-end and back-end development: 4 weeks\n- Testing, optimization, and deployment: 1 week",
//   "links": {
//     "githubLink": "https://github.com/sampleproject20",
//     "figmaLink": "https://figma.com/sampleproject20",
//     "others": [
//       {
//         "name": "Email",
//         "value": "sample20@example.com"
//       },
//       {
//         "name": "Discord",
//         "value": "sample20#6789"
//       }
//     ]
//   },
//   "bountyType": "Web Application"
// }
