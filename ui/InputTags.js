import { useRef, useState } from "react";
import styles from "@/styles/input_Tags.module.css";
import CustomTags from "./CustomTags";
import Label from "./Label";
import List from "./List";

const InputTags = ({
  label,
  tagsData,
  createfunc,
  popfunc,
  placeholder,
  onBlur,
}) => {
  const [inputVal, setInput] = useState("");
  const inpRef = useRef();

  const focusfunc = () => {
    inpRef.current.focus();
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onHitEnter_Backspace = (event) => {
    if (event.key === "Enter" && inputVal.trim() !== "") {
      event.preventDefault();
      createfunc(inputVal.trim());
      setInput("");
    } else if (event.key === "Backspace" && inputVal === "") {
      event.preventDefault();
      popfunc();
    }
  };

  return (
    <List onClick={focusfunc}>
      <Label>{label}</Label>
      <div className={styles.tags_outer}>
        <div className={styles.all_tags}>
          {tagsData.map((eachTag) => {
            return <CustomTags key={eachTag}>{eachTag}</CustomTags>;
          })}
          <input
            ref={inpRef}
            value={inputVal}
            onChange={onChangeHandler}
            onKeyDown={onHitEnter_Backspace}
            className={styles.tagInput}
            placeholder={placeholder}
            onBlur={onBlur}
          />
        </div>
      </div>
    </List>
  );
};
export default InputTags;
