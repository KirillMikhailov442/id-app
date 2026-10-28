import { clsx } from "clsx";

import { RegisterIllustrationHero } from "./register-illustration-hero";
import { RegisterIllustrationLeft } from "./register-illustration-left";
import { RegisterIllustrationRight } from "./register-illustration-right";
import s from "./register-illustrations.module.scss";

export const RegisterIllustrations = () => {
  return (
    <>
      <div aria-hidden="true" className={clsx(s.side, s.sideLeft)}>
        <RegisterIllustrationLeft />
      </div>

      <div aria-hidden="true" className={clsx(s.side, s.sideRight)}>
        <RegisterIllustrationRight />
      </div>

      <div aria-hidden="true" className={s.hero}>
        <RegisterIllustrationHero />
      </div>
    </>
  );
};
