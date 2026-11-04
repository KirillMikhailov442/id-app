import s from "./profile-field.module.scss";

interface ProfileFieldProps {
  label: string;
  value: string;
}

export const ProfileField = ({ label, value }: ProfileFieldProps) => (
  <div className={s.field}>
    <dt className={s.label}>{label}</dt>
    <dd className={s.value}>{value}</dd>
  </div>
);
