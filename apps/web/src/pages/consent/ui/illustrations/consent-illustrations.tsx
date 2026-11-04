import { clsx } from "clsx";

import { ConsentIllustrationDefs } from "./consent-illustration-defs";
import { ConsentIllustrationHero } from "./consent-illustration-hero";
import { ConsentIllustrationLeft } from "./consent-illustration-left";
import { ConsentIllustrationRight } from "./consent-illustration-right";
import s from "./consent-illustrations.module.scss";

export const ConsentIllustrations = () => {
  return (
    <>
      <ConsentIllustrationDefs />
      <div aria-hidden className={s.hero}>
        <ConsentIllustrationHero />
      </div>
      <div aria-hidden className={clsx(s.side, s.left)}>
        <ConsentIllustrationLeft />
      </div>
      <div aria-hidden className={clsx(s.side, s.right)}>
        <ConsentIllustrationRight />
      </div>
    </>
  );
};
