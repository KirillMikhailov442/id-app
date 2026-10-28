import { httpClient, type HttpRequestOptions } from "@shared/api";
import { fetchAllPages } from "@shared/lib";
import type { PaginationResponse } from "@shared/types";

import type { Scope } from "../types";

class _ScopeService {
  private readonly baseUrl = "/v1/scopes";

  public getAll(config: HttpRequestOptions = {}): Promise<Scope[]> {
    return fetchAllPages<Scope>((params) =>
      httpClient.get<PaginationResponse<Scope>>(this.baseUrl, { ...config, params })
    );
  }
}

export const ScopeService = new _ScopeService();
