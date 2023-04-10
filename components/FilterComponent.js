import styles from "../styles/filtercomponent.module.css";
const FilterComponent = () => {
  return (
    <div className={styles.filter_outerlayer}>
      <input
        className={styles.seachFilter}
        placeholder="Search bounty, tags, language"
      />
      <div className={styles.sort}>
        <select>
          <option>Sort by Recommend</option>
          <option>Sort by Date</option>
          <option>Sort by Reward</option>
        </select>
        <select>
          <option>All Bounties</option>
          <option>Open Bounties</option>
          <option>In Progress Bounties</option>
          <option>Completed Bounties</option>
        </select>
      </div>
    </div>
  );
};
export default FilterComponent;
