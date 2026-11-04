import { vi } from "vitest";

import { ClientService } from "@entities/client";
import { OAuthGrantService } from "@entities/oauth-grant";
import { ScopeService } from "@entities/scope";
import { SessionService } from "@entities/session";
import { UserService } from "@entities/user";

import type { SessionUser } from "@shared/api";

import {
  screenshotClient,
  screenshotGrant,
  screenshotList,
  screenshotSessions,
  screenshotUser,
} from "./screenshot-data";

export const mockScreenshotApi = (user: SessionUser, empty: boolean) => {
  const clients = screenshotList(empty ? [] : [screenshotClient]);

  vi.spyOn(UserService, "getProfile").mockResolvedValue(user);
  vi.spyOn(UserService, "getAll").mockResolvedValue(screenshotList(empty ? [] : [screenshotUser]));
  vi.spyOn(SessionService, "getAll").mockResolvedValue(empty ? [] : screenshotSessions);
  vi.spyOn(OAuthGrantService, "getOwn").mockResolvedValue(empty ? [] : [screenshotGrant]);
  vi.spyOn(ClientService, "getMine").mockResolvedValue(clients);
  vi.spyOn(ClientService, "listAll").mockResolvedValue(clients);
  vi.spyOn(ClientService, "getById").mockResolvedValue(screenshotClient);
  vi.spyOn(ScopeService, "getAll").mockResolvedValue([]);
};
