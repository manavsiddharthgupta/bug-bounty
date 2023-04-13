import styles from "../styles/tag.module.css";

const Tag = (props) => {
  let classes = styles.tag;
  if (props.className) {
    classes = props.className;
  }
  return (
    <div className={classes}>
      <p>{props.children}</p>
    </div>
  );
};

export default Tag;
