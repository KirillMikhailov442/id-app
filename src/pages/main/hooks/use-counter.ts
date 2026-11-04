import { useAtom } from "jotai";

import { COUNT_STEP } from "../model/main.const";
import { MainModel } from "../model/main.model";

export const useCounter = () => {
  const [count, setCount] = useAtom(MainModel.countAtom);
  const increment = () => {
    setCount((prev) => prev + COUNT_STEP);
  };

  return {
    count,
    increment,
  };
};
