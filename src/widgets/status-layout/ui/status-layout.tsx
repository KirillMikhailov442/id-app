import type { ReactNode } from "react";

import s from "./status-layout.module.scss";

interface StatusLayoutProps {
  title: string;
  description: string;
  illustration: ReactNode;
  children?: ReactNode;
  settings: ReactNode;
}

export const StatusLayout = ({ title, description, illustration, children, settings }: StatusLayoutProps) => (
  <>
    {settings}
    <main className={s.page}>
      <div className={s.content}>
        <div className={s.illustration}>{illustration}</div>
        <h1 className={s.title}>{title}</h1>
        <p className={s.description}>{description}</p>
        {children != null && <div className={s.actions}>{children}</div>}
      </div>
    </main>
  </>
);
