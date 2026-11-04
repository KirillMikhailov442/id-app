import { accountRoute } from "./_account";
import { consentRoute } from "./consent";
import { authLayoutRoute } from "./layout";

export const authRoute = authLayoutRoute.addChildren([accountRoute, consentRoute]);
