import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, vi } from "vitest";
import { page } from "vitest/browser";

import { router } from "@app/router";

import { AuthSessionModel } from "@features/auth-session";

import { SessionModel, type SessionUser } from "@shared/api";
import { queryClient } from "@shared/config";
import { i18n } from "@shared/i18n";
import { jotaiStore } from "@shared/lib";

import { toast } from "@id-app/shadcn";

import { viewports } from "./screenshot-data";

import "../../src/app/styles/globals.scss";
import "@id-app/shadcn/styles/globals.css";

const accessToken = "form-test-access-token";

export const setupFormPage = () => {
  let root: Root;

  beforeEach(async () => {
    const [desktop] = viewports;

    await page.viewport(desktop.width, desktop.height);
    await i18n.changeLanguage("en");

    root = createRoot(document.body);
  });

  afterEach(async () => {
    try {
      toast.dismiss();
      await expect
        .element(
          page
            .getByRole("region", { name: /Notifications/ })
            .getByRole("listitem")
            .first()
        )
        .not.toBeInTheDocument();
    } finally {
      root.unmount();
      queryClient.clear();
      SessionModel.logout();
      jotaiStore.set(AuthSessionModel.statusAtom, "idle");
      vi.restoreAllMocks();
    }
  });

  return (path: string, user?: SessionUser) => {
    if (user !== undefined) {
      SessionModel.login(user, accessToken);
    }

    jotaiStore.set(AuthSessionModel.statusAtom, "ready");

    const testRouter = createRouter({
      ...router.options,
      history: createMemoryHistory({ initialEntries: [path] }),
    });

    root.render(<RouterProvider router={testRouter} />);

    return testRouter;
  };
};
