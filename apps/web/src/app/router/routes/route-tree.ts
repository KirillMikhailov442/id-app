import { rootRoute } from "./__root";
import { authRoute } from "./_auth";
import { guestRoute } from "./_guest";
import { blockedRoute } from "./blocked";

export const routeTree = rootRoute.addChildren([authRoute, guestRoute, blockedRoute]);
