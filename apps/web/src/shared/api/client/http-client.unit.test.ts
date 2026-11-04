import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { afterEach, expect, it, vi } from "vitest";

import { jotaiStore } from "@shared/lib";

import { SessionModel } from "../session";
import { TOKEN_REFRESH_PATH } from "../token-refresh/token-refresh.const";
import { HttpClient } from "./http-client";

const expiredToken = "expired-token";
const refreshedToken = "fresh-token";
const protectedPaths = ["/profile", "/sessions"];

const response = (config: InternalAxiosRequestConfig, status: number, data: unknown): AxiosResponse<unknown> => ({
  config,
  status,
  statusText: String(status),
  headers: {},
  data,
});

afterEach(() => {
  SessionModel.logout();
});

it("shares one token refresh across concurrent 401s and retries both requests", async () => {
  let finishRefresh!: () => void;
  const refreshGate = new Promise<void>((resolve) => {
    finishRefresh = resolve;
  });
  const expiredRequests: string[] = [];
  const retriedRequests: string[] = [];
  const refresh = vi.fn(async () => {
    await refreshGate;

    return { accessToken: refreshedToken };
  });

  const client = new HttpClient({
    adapter: async (config) => {
      const path = config.url ?? "";

      if (path === TOKEN_REFRESH_PATH) {
        return response(config, 200, await refresh());
      }

      if (config.headers.get("Authorization") === `Bearer ${expiredToken}`) {
        expiredRequests.push(path);

        throw new AxiosError("Unauthorized", AxiosError.ERR_BAD_REQUEST, config, undefined, response(config, 401, {}));
      }

      expect(config.headers.get("Authorization")).toBe(`Bearer ${refreshedToken}`);
      retriedRequests.push(path);

      return response(config, 200, { path });
    },
  });

  SessionModel.setAccessToken(expiredToken);

  const pending = Promise.allSettled(protectedPaths.map((path) => client.get<{ path: string }>(path)));

  try {
    await vi.waitFor(() => {
      expect(expiredRequests).toEqual(protectedPaths);
      expect(refresh).toHaveBeenCalledTimes(1);
    });
    expect(retriedRequests).toEqual([]);
  } finally {
    finishRefresh();
    await pending;
  }

  expect(await pending).toEqual(protectedPaths.map((path) => ({ status: "fulfilled", value: { path } })));
  expect(retriedRequests).toEqual(protectedPaths);
  expect(refresh).toHaveBeenCalledTimes(1);
  expect(jotaiStore.get(SessionModel.accessTokenAtom)).toBe(refreshedToken);
});
