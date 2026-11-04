import { HTTP_BASE_URL } from "@shared/api";

export const GOOGLE_LOGIN_URL = `${HTTP_BASE_URL.replace(/\/+$/, "")}/v1/auth/google`;
