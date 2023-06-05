import { useEffect, useState } from "react";

const useTextAreaState = (
  structure,
  validFunc = () => {
    return undefined;
  }
) => {
  const [textState, setTextState] = useState("");
  // const [isValueValid, setValidity] = useState(false);
  const [isTouched, setifTouched] = useState(false);

  let isValueValid = validFunc(textState);

  useEffect(() => {
    if (structure) {
      setTextState(structure);
    }
  }, [structure]);

  const setBlurHandler = () => {
    setifTouched(true);
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
