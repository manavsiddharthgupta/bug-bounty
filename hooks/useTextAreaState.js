import { useEffect, useState } from "react";

const useTextAreaState = (structure) => {
  const [textState, setTextState] = useState("");
  const [isValueValid, setValidity] = useState(false);
  const [isTouched, setifTouched] = useState(false);

  useEffect(() => {
    if (structure) {
      setTextState(structure);
    }
  }, [structure]);

  const setBlurHandler = () => {
    setifTouched(true);
    if (textState.trim() === "") {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };

  const onChangeHandler = (e) => {
    setTextState(e.target.value);
  };

  return {
    textState,
    isValueValid,
    isTouched,
    setBlurHandler,
    onChangeHandler,
  };
};

export default useTextAreaState;
