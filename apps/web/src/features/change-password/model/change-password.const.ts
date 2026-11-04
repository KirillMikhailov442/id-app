export const CHANGE_PASSWORD_DEFAULT_VALUES = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const INVALID_OLD_PASSWORD_CODE = "INVALID_OLD_PASSWORD";

export const CHANGE_PASSWORD_FIELDS = [
  { name: "currentPassword", label: "security.password.current", autoComplete: "current-password" },
  { name: "newPassword", label: "security.password.new", autoComplete: "new-password" },
  { name: "confirmPassword", label: "security.password.confirm", autoComplete: "new-password" },
] as const;
