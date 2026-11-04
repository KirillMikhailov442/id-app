import { adminClientsRoute } from "./clients";
import { adminLayoutRoute } from "./layout";
import { adminUsersRoute } from "./users";

export const adminRoute = adminLayoutRoute.addChildren([adminUsersRoute, adminClientsRoute]);
