import { useState } from "react";
const useInputState = (validatefunc) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setifTouched] = useState(false);

  const isValueValid = validatefunc(inputValue);

  console.log(isValueValid);

  const setBlurHandler = () => {
    setifTouched(true);
  };

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return {
    inputValue,
    isValueValid,
    isTouched,
    setBlurHandler,
    onChangeHandler,
  };
};

export default useInputState;
