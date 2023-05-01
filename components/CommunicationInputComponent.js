import Label from "../ui/Label";
import styles from "../styles/comms_input.module.css";
import List from "@/ui/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CommunicationInput = (props) => {
  const allLinkTypes = [
    { type: "Discord", placeholder: "Username #1323" },
    { type: "Email", placeholder: "example@example.com" },
  ];

  return (
    <List>
      <div className={styles.outer_comms}>
        <CommunicationType
          id={props.id}
          optionTypes={
            props.CommunicationLinkprovide
              ? props.CommunicationLinkprovide
              : allLinkTypes
          }
          value={props.value}
          onSetCommunicationHandler={props.onSetCommunicationHandler}
        />
        <CommunicationLink
          id={props.id}
          optionTypes={
            props.CommunicationLinkprovide
              ? props.CommunicationLinkprovide
              : allLinkTypes
          }
          value={props.value}
          onSetCommunicationHandler={props.onSetCommunicationHandler}
        />
      </div>
    </List>
  );
};

const CommunicationType = ({
  id,
  value,
  optionTypes,
  onSetCommunicationHandler,
}) => {
  return (
    <div className={styles.comms_type}>
      <Label>Communication</Label>
      <select
        value={value.type}
        onChange={(e) => {
          onSetCommunicationHandler((prevState) => {
            const linkData = {
              ...prevState[id],
              type: e.target.value,
            };
            const allNewDatalink = [...prevState];
            allNewDatalink[id] = linkData;
            return [...allNewDatalink];
          });
        }}
        name="commType"
        id="comms"
      >
        {optionTypes.map((linkType) => {
          return (
            <option key={linkType.type} value={linkType.type}>
              {linkType.type}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const CommunicationLink = ({
  id,
  optionTypes,
  value,
  onSetCommunicationHandler,
}) => {
  const selectedOption = optionTypes.find(
    (linkType) => linkType.type === value.type
  );
  return (
    <div className={styles.comms_link}>
      <div className={styles.labels}>
        <Label>{value.type}</Label>
        <FontAwesomeIcon
          onClick={() => {
            if (value.length === 1) {
              return;
            }
            onSetCommunicationHandler((prevState) => {
              if (prevState.length === 1) {
                return [...prevState];
              }
              const allNewDatalink = [
                ...prevState.slice(0, id),
                ...prevState.slice(id + 1, prevState.length),
              ];
              return [...allNewDatalink];
            });
          }}
          icon={faTrash}
          className={styles.delete_icon}
        />
      </div>
      <input
        value={value.link}
        onChange={(e) => {
          onSetCommunicationHandler((prevState) => {
            const linkData = {
              ...prevState[id],
              link: e.target.value,
            };
            const allNewDatalink = [...prevState];
            allNewDatalink[id] = linkData;
            return [...allNewDatalink];
          });
        }}
        placeholder={selectedOption.placeholder}
        type="text"
      />
    </div>
  );
};

export default CommunicationInput;
