import { httpClient, type HttpRequestOptions } from "@shared/api";
import type { PaginationResponse } from "@shared/types";

import type {
  Client,
  ClientScope,
  CreateClientRequest,
  GetClientsParams,
  SetClientScopesRequest,
  SetClientScopesVariables,
  UpdateClientVariables,
} from "../types";

class _ClientService {
  private readonly baseUrl = "/v1/clients";

  public getMine(params?: GetClientsParams, config: HttpRequestOptions = {}): Promise<PaginationResponse<Client>> {
    return httpClient.get<PaginationResponse<Client>>(`${this.baseUrl}/me`, { ...config, params });
  }

  public async listAll(
    params?: GetClientsParams,
    config: HttpRequestOptions = {}
  ): Promise<PaginationResponse<Client>> {
    return httpClient.get<PaginationResponse<Client>>(this.baseUrl, { ...config, params });
  }

  public getById(id: string, config: HttpRequestOptions = {}): Promise<Client> {
    return httpClient.get<Client>(`${this.baseUrl}/${encodeURIComponent(id)}`, config);
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
