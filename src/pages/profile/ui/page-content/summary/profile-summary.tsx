import type { ProfileFieldData } from "../../../types";
import { ProfileField } from "./field/profile-field";
import s from "./profile-summary.module.scss";

interface ProfileSummaryProps {
  title: string;
  fields: ProfileFieldData[];
}

export const ProfileSummary = ({ title, fields }: ProfileSummaryProps) => (
  <section className={s.summary}>
    <h2 className={s.title}>{title}</h2>
    <dl className={s.fields}>
      {fields.map(({ id, label, value }) => (
        <ProfileField key={id} label={label} value={value} />
      ))}
    </dl>
  </section>
);
