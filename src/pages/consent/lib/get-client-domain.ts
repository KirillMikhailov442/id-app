export const getClientDomain = (location: string | null): string | null => {
  if (location === null || location.length === 0) return null;

  try {
    const url = new URL(location);

    return url.hostname || null;
  } catch {
    return null;
  }
};
