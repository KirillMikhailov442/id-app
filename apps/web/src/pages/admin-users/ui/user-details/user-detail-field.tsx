import type { ReactNode } from "react";

import s from "./user-details.module.scss";

interface UserDetailFieldProps {
  label: string;
  children: ReactNode;
}

export const UserDetailField = ({ label, children }: UserDetailFieldProps) => (
  <div className={s.field}>
    <dt className={s.label}>{label}</dt>
    <dd className={s.value}>{children}</dd>
  </div>
);
