import type { FC } from "react";

import { useCounter } from "../hooks/use-counter";
import s from "./main-page.module.scss";

export const MainPage: FC = () => {
  const { count, increment } = useCounter();

  return (
    <main className={s.page}>
      <h1 className={s.title}>id-app</h1>
      <p className={s.subtitle}>Главная страница</p>
      <button className={s.counterButton} onClick={increment} type="button">
        Счётчик: {count}
      </button>
    </main>
  );
};
