export interface Client {
  id: string;
  userId: string;
  name: string;
  location: string | null;
  isActive: boolean;
  scopes: string[];
  createdAt: string;
}

export interface ClientScope {
  id: string;
  name: string;
  createdAt: string;
}

export interface CreateClientRequest {
  name: string;
  secret: string;
  location?: string;
}

export interface UpdateClientRequest {
  name?: string;
  isActive?: boolean;
  location?: string;
}

export interface UpdateClientVariables {
  id: string;
  data: UpdateClientRequest;
}

export interface SetClientScopesRequest {
  scopes: string[];
}

export interface SetClientScopesVariables extends SetClientScopesRequest {
  id: string;
}
