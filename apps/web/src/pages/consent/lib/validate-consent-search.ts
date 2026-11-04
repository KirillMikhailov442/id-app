export const validateConsentSearch = (search: Record<string, unknown>) => ({
  ...search,
  client_id: typeof search.client_id === "string" ? search.client_id : "",
  scope: typeof search.scope === "string" ? search.scope : "",
  redirect_uri: typeof search.redirect_uri === "string" ? search.redirect_uri : "",
  state: typeof search.state === "string" ? search.state : undefined,
});
