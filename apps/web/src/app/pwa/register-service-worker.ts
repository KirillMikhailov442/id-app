import { SERVICE_WORKER_FILENAME } from "./pwa.const";

export const registerServiceWorker = async (): Promise<void> => {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;

  try {
    await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}${SERVICE_WORKER_FILENAME}`);
  } catch (error: unknown) {
    console.error("Service worker registration failed", error);
  }
};
