export { ClientService } from "./api/client.service";
export { useGetClients } from "./hooks/use-get-clients";
export { useGetAllClients } from "./hooks/use-get-all-clients";
export { useCreateClient } from "./hooks/use-create-client";
export { useUpdateClient } from "./hooks/use-update-client";
export { useDeleteClient } from "./hooks/use-delete-client";
export { useSetClientScopes } from "./hooks/use-set-client-scopes";
export { ClientQueryKeys } from "./model/query-keys.const";
export { ClientMutationKeys } from "./model/mutation-keys.const";
export type {
  Client,
  ClientScope,
  CreateClientRequest,
  GetClientsParams,
  UpdateClientRequest,
  UpdateClientVariables,
  SetClientScopesVariables,
  SetClientScopesRequest,
} from "./types";
export { useGetClient } from "./hooks/use-get-client";
