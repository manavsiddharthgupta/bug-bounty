import Label from "../ui/Label";
import styles from "../styles/comms_input.module.css";
import List from "@/ui/List";

const CommunicationInput = (props) => {
  return (
    <List>
      <div className={styles.outer_comms}>
        <CommunicationType
          onSetCommunicationHandler={props.onSetCommunicationHandler}
        />
        <CommunicationLink
          value={props.value}
          onSetCommunicationHandler={props.onSetCommunicationHandler}
        />
      </div>
    </List>
  );
};

const CommunicationType = ({ onSetCommunicationHandler }) => {
  return (
    <div className={styles.comms_type}>
      <Label>Communication</Label>
      <select
        onChange={(e) => {
          console.log(e.target.value);
          onSetCommunicationHandler((prevState) => {
            return {
              ...prevState,
              type: e.target.value,
            };
          });
        }}
        name="commType"
        id="comms"
      >
        <option value="Discord">Discord</option>
        <option value="Email">Email</option>
      </select>
    </div>
  );
};

const CommunicationLink = ({ value, onSetCommunicationHandler }) => {
  return (
    <div className={styles.comms_link}>
      <Label>Discord</Label>
      <input
        onChange={(e) => {
          onSetCommunicationHandler((prevState) => {
            return {
              ...prevState,
              link: e.target.value,
            };
          });
        }}
        placeholder={
          value.type === "Discord" ? "Username #1323" : "example@example.com"
        }
        type="text"
      />
    </div>
  );
};

export default CommunicationInput;
