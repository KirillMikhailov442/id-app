import { httpClient, type HttpRequestOptions } from "@shared/api";
import type { PaginationParams, PaginationResponse } from "@shared/types";

import type {
  Client,
  ClientScope,
  ClientWithScopes,
  CreateClientRequest,
  SetClientScopesRequest,
  SetClientScopesVariables,
  UpdateClientVariables,
} from "../types";

class _ClientService {
  private readonly baseUrl = "/v1/clients";

  public async getAll(
    params?: PaginationParams,
    config: HttpRequestOptions = {}
  ): Promise<PaginationResponse<ClientWithScopes>> {
    const page = await httpClient.get<PaginationResponse<Client>>(this.baseUrl, { ...config, params });
    const items = await Promise.all(
      page.items.map(async (client) => {
        const scopes = await this.getScopes(client.id, config);

        return { ...client, scopes: scopes.map(({ name }) => name) };
      })
    );

    return { items, meta: page.meta };
  }

  public getScopes(id: string, config: HttpRequestOptions = {}): Promise<ClientScope[]> {
    return httpClient.get<ClientScope[]>(`${this.baseUrl}/${encodeURIComponent(id)}/scopes`, config);
  }

  public create(data: CreateClientRequest): Promise<Client> {
    return httpClient.post<Client, CreateClientRequest>(this.baseUrl, data);
  }

  public update({ id, data }: UpdateClientVariables): Promise<Client> {
    return httpClient.patch<Client, typeof data>(`${this.baseUrl}/${encodeURIComponent(id)}`, data);
  }

  public delete(id: string): Promise<void> {
    return httpClient.delete<void>(`${this.baseUrl}/${encodeURIComponent(id)}`);
  }

  public setScopes({ id, scopes }: SetClientScopesVariables): Promise<ClientScope[]> {
    return httpClient.put<ClientScope[], SetClientScopesRequest>(`${this.baseUrl}/${encodeURIComponent(id)}/scopes`, {
      scopes,
    });
  }
}

export const ClientService = new _ClientService();
