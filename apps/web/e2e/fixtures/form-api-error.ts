export const formApiError = (code: string) =>
  Object.assign(new Error(code), { isAxiosError: true, response: { data: { code } } });
