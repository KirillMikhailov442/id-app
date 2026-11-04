export interface FailedRequest {
  retry: (accessToken: string) => void;
  reject: (error: unknown) => void;
}
