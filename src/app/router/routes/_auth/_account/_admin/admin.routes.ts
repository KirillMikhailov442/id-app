import { adminLayoutRoute } from "./layout";
import { adminClientsRoute } from "./clients";
import { adminUsersRoute } from "./users";

export const adminRoute = adminLayoutRoute.addChildren([adminUsersRoute, adminClientsRoute]);
