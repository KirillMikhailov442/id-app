import { clsx } from "clsx";

import { LoginIllustrationHero } from "./login-illustration-hero";
import { LoginIllustrationLeft } from "./login-illustration-left";
import { LoginIllustrationRight } from "./login-illustration-right";
import s from "./login-illustrations.module.scss";

export const LoginIllustrations = () => {
  return (
    <>
      <div aria-hidden="true" className={clsx(s.side, s.sideLeft)}>
        <LoginIllustrationLeft />
      </div>

      <div aria-hidden="true" className={clsx(s.side, s.sideRight)}>
        <LoginIllustrationRight />
      </div>

      <div aria-hidden="true" className={s.hero}>
        <LoginIllustrationHero />
      </div>
    </>
  );
};
