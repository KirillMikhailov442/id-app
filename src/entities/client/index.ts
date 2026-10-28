export { ClientService } from "./api/client.service";
export { useGetClients } from "./hooks/use-get-clients";
export { useCreateClient } from "./hooks/use-create-client";
export { useUpdateClient } from "./hooks/use-update-client";
export { useDeleteClient } from "./hooks/use-delete-client";
export { useSetClientScopes } from "./hooks/use-set-client-scopes";
export { ClientQueryKeys } from "./model/query-keys.const";
export { ClientMutationKeys } from "./model/mutation-keys.const";
export type {
  Client,
  ClientScope,
  ClientWithScopes,
  CreateClientRequest,
  UpdateClientRequest,
  UpdateClientVariables,
  SetClientScopesVariables,
  SetClientScopesRequest,
} from "./types";
