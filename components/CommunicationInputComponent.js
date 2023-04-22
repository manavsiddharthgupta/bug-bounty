import Label from "../ui/Label";
import styles from "../styles/comms_input.module.css";
import List from "@/ui/List";

const CommunicationInput = () => {
  return (
    <List>
      <div className={styles.outer_comms}>
        <CommunicationType />
        <CommunicationLink />
      </div>
    </List>
  );
};

const CommunicationType = () => {
  return (
    <div className={styles.comms_type}>
      <Label>Communication</Label>
      <select name="commType" id="comms">
        <option value="Discord">Discord</option>
        <option value="Email">Email</option>
      </select>
    </div>
  );
};

const CommunicationLink = () => {
  return (
    <div className={styles.comms_link}>
      <Label>Discord</Label>
      <input type="text" />
    </div>
  );
};

export default CommunicationInput;
