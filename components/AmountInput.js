import List from "@/ui/List";
import styles from "../styles/amountInput.module.css";
import Label from "@/ui/Label";

const AmountInput = ({ value, onChange }) => {
  return (
    <List>
      <Label>Bounty Amount</Label>
      <div className={styles.amount_input_outer}>
        <span>₹</span>
        <input value={value} onChange={onChange} type="number" />
      </div>
    </List>
  );
};
export default AmountInput;
