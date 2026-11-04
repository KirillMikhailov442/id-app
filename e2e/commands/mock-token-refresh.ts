import { defineBrowserCommand } from "@vitest/browser-playwright";

declare module "vitest/browser" {
  interface BrowserCommands {
    mockTokenRefresh(
      baseUrl: string,
      expiredToken: string,
      refreshedToken: string,
      profile: object,
      sessions: object[]
    ): Promise<void>;
  }
}

export const mockTokenRefresh = defineBrowserCommand(
  async (
    { page },
    baseUrl: string,
    expiredToken: string,
    refreshedToken: string,
    profile: object,
    sessions: object[]
  ) => {
    const apiUrl = new URL(baseUrl, page.url()).href.replace(/\/$/, "");
    let receivedExpiredToken = false;
    let issuedRefreshedToken = false;

    await page.route(`${apiUrl}/v1/users/me`, async (route) => {
      await route.fulfill({ json: profile });
    });

    await page.route(`${apiUrl}/v1/auth/refresh`, async (route) => {
      if (!receivedExpiredToken || issuedRefreshedToken || route.request().method() !== "POST") {
        await route.fulfill({ status: 401, json: { code: "INVALID_REFRESH" } });

        return;
      }

      issuedRefreshedToken = true;
      await route.fulfill({ json: { accessToken: refreshedToken } });
    });

    await page.route(`${apiUrl}/v1/users/me/sessions`, async (route) => {
      const authorization = route.request().headers().authorization;

      if (issuedRefreshedToken && authorization === `Bearer ${refreshedToken}`) {
        await route.fulfill({ json: sessions });

        return;
      }

      receivedExpiredToken = authorization === `Bearer ${expiredToken}`;
      await route.fulfill({ status: 401, json: { code: "UNAUTHORIZED" } });
    });
  }
);
