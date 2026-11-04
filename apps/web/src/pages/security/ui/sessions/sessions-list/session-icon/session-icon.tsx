import clsx from "clsx";
import { Globe } from "lucide-react";

import { SESSION_BROWSER_ICONS, SESSION_OS_ICONS } from "../../../../model/session-icons.const";
import s from "./session-icon.module.scss";

interface SessionIconProps {
  browser: string | null;
  os: string | null;
}

export const SessionIcon = ({ browser, os }: SessionIconProps) => {
  const icon =
    SESSION_BROWSER_ICONS.find(({ pattern }) => pattern.test(browser ?? "")) ??
    SESSION_OS_ICONS.find(({ pattern }) => pattern.test(os ?? ""));

  return (
    <span aria-hidden="true" className={clsx(s.icon, icon && s[icon.color])}>
      {icon ? <img alt="" className={s.logo} src={icon.src} /> : <Globe size={28} />}
    </span>
  );
};
