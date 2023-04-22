import { useRef, useState } from "react";
const useInputState = () => {
  const inputRef = useRef();
  const [isValueValid, setValidity] = useState(false);
  const [isTouched, setifTouched] = useState(false);

  const setBlurHandler = () => {
    setifTouched(true);
    if (inputRef.current.value.trim() === "") {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };

  return {
    inputRef,
    isValueValid,
    isTouched,
    setBlurHandler,
  };
};

export default useInputState;
