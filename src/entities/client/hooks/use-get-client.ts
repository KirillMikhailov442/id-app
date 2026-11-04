import { useQuery } from "@tanstack/react-query";

import { ClientService } from "../api/client.service";
import { ClientQueryKeys } from "../model/query-keys.const";

export const useGetClient = (id: string) =>
  useQuery({
    queryKey: [ClientQueryKeys.GetById, id],
    queryFn: ({ signal }) => ClientService.getById(id, { signal }),
    enabled: id.length > 0,
  });
