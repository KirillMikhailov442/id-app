import { atom } from "jotai";

import type { SessionUser } from "@shared/api";
import { jotaiStore } from "@shared/lib";
import { ModalId, ModalService } from "@shared/modal";

import { ADMIN_USERS_INITIAL_OFFSET } from "./admin-users.const";
import { USER_APPS_INITIAL_OFFSET } from "./user-apps.const";
import { USER_SESSIONS_INITIAL_OFFSET } from "./user-sessions.const";

class _AdminUsersModel {
  public readonly offsetAtom = atom(ADMIN_USERS_INITIAL_OFFSET);
  public readonly searchAtom = atom("");
  public readonly debouncedSearchAtom = atom("");
  public readonly sessionsOffsetAtom = atom(USER_SESSIONS_INITIAL_OFFSET);
  public readonly appsOffsetAtom = atom(USER_APPS_INITIAL_OFFSET);

  public setSearch = (search: string): void => {
    jotaiStore.set(this.searchAtom, search);
  };

  public applySearch = (search: string): void => {
    if (jotaiStore.get(this.debouncedSearchAtom) === search) return;

    this.setOffset(ADMIN_USERS_INITIAL_OFFSET);
    jotaiStore.set(this.debouncedSearchAtom, search);
  };

  public openApps = (user: SessionUser): void => {
    this.setAppsOffset(USER_APPS_INITIAL_OFFSET);
    ModalService.openModal(ModalId.AdminUserApps, user);
  };

  public closeApps = (): void => {
    ModalService.closeModal(ModalId.AdminUserApps);
  };

  public setAppsOffset = (offset: number): void => {
    jotaiStore.set(this.appsOffsetAtom, offset);
  };

  public openSessions = (user: SessionUser): void => {
    this.setSessionsOffset(USER_SESSIONS_INITIAL_OFFSET);
    ModalService.openModal(ModalId.AdminUserSessions, user);
  };

  public closeSessions = (): void => {
    ModalService.closeModal(ModalId.AdminUserSessions);
  };

  public setSessionsOffset = (offset: number): void => {
    jotaiStore.set(this.sessionsOffsetAtom, offset);
  };

  public openDetails = (user: SessionUser): void => {
    ModalService.openModal(ModalId.AdminUserDetails, user);
  };

  public closeDetails = (): void => {
    ModalService.closeModal(ModalId.AdminUserDetails);
  };

  public setOffset = (offset: number): void => {
    jotaiStore.set(this.offsetAtom, offset);
  };

  public openEditor = (user: SessionUser): void => {
    ModalService.openModal(ModalId.AdminUserEdit, user);
  };

  public closeEditor = (): void => {
    ModalService.closeModal(ModalId.AdminUserEdit);
  };

  public reset = (): void => {
    this.setSearch("");
    this.applySearch("");
    this.setOffset(ADMIN_USERS_INITIAL_OFFSET);
    this.closeEditor();
    this.closeDetails();
    this.closeSessions();
    this.closeApps();
    this.setAppsOffset(USER_APPS_INITIAL_OFFSET);
    this.setSessionsOffset(USER_SESSIONS_INITIAL_OFFSET);
  };
}

export const AdminUsersModel = new _AdminUsersModel();
