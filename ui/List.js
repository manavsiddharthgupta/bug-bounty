import styles from "../styles/list.module.css";

const List = (props) => {
  return (
    <div onClick={props.onClick} className={styles.list}>
      {props.children}
    </div>
  );
};

export default List;
