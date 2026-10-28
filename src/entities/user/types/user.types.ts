export interface UpdateProfileRequest {
  name: string;
  surname: string;
  email: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
