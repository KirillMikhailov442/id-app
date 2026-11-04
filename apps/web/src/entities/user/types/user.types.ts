export interface UpdateProfileRequest {
  name: string;
  surname: string;
  email: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateUserParams {
  id: string;
  data: UpdateProfileRequest;
}

export interface SetUserBlockedParams {
  id: string;
  blocked: boolean;
}
