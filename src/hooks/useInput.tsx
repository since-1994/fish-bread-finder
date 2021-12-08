import { useState, useCallback, ChangeEvent } from "react";

type onChangeType = (e: ChangeEvent<HTMLInputElement>) => void;

const useInput = (initialState = "") => {
  const [state, setState] = useState(initialState);

  const handler = useCallback((e) => {
    setState(e.target.value);
  }, []);

  return [state, handler] as [string, onChangeType];
};

export default useInput;
