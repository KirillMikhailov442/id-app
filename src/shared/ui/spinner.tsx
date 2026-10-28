import { LoaderCircle } from "lucide-react";

import s from "./spinner.module.scss";

export const Spinner = () => <LoaderCircle aria-hidden="true" className={s.spinner} />;
