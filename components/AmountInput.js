import List from "@/ui/List";
import styles from "../styles/amountInput.module.css";
import Label from "@/ui/Label";

const AmountInput = () => {
  return (
    <List>
      <Label>Bounty Amount</Label>
      <div className={styles.amount_input_outer}>
        <span>₹</span>
        <input type="number" />
      </div>
    </List>
  );
};
export default AmountInput;
