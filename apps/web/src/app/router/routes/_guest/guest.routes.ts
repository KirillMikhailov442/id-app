import { guestLayoutRoute } from "./layout";
import { loginRoute } from "./login";
import { registerRoute } from "./register";

export const guestRoute = guestLayoutRoute.addChildren([loginRoute, registerRoute]);
