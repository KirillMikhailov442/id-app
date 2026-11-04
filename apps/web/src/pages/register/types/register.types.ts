import type { z } from "zod";

import type { createRegisterSchema } from "../lib/register-schema";

export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;
