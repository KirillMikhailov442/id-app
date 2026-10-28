import { useAtom } from "jotai";

import { ConsentModel } from "../model/consent.model";

export const useConsent = () => {
  const [decision] = useAtom(ConsentModel.decisionAtom);

  return { decision, setDecision: ConsentModel.setDecision };
};
