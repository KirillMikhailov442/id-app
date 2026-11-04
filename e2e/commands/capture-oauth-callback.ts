import { defineBrowserCommand } from "@vitest/browser-playwright";
import type { Route } from "playwright";

declare module "vitest/browser" {
  interface BrowserCommands {
    captureOAuthCallback(callback: string, button: string): Promise<string>;
  }
}

export const captureOAuthCallback = defineBrowserCommand(async ({ page, iframe }, callback: string, button: string) => {
  const { origin, pathname } = new URL(callback);
  const matchesCallback = (url: URL) => url.origin === origin && url.pathname === pathname;
  const fulfill = (route: Route) => route.fulfill({ status: 204 });

  await page.route(matchesCallback, fulfill);

  try {
    const [response] = await Promise.all([
      page.waitForResponse((response) => matchesCallback(new URL(response.url())), { timeout: 5_000 }),
      iframe.getByRole("button", { name: button, exact: true }).click(),
    ]);

    return response.url();
  } finally {
    await page.unroute(matchesCallback, fulfill);
  }
});
