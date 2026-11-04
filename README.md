<div align="center">
  <img src="./apps/web/public/favicon.svg" alt="Mikh SSO" width="120" height="120" />
  <h1>Mikh SSO</h1>
  <img src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/TanStack%20Router-18181B" alt="TanStack Router" />
  <img src="https://img.shields.io/badge/Jotai-18181B" alt="Jotai" />
  <img src="https://img.shields.io/badge/SCSS%20Modules-CC6699?logo=sass&logoColor=white" alt="SCSS Modules" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-18181B?logo=shadcnui&logoColor=white" alt="shadcn/ui" />
</div>

Mikh SSO — веб-интерфейс сервиса единого входа. Приложение предоставляет личный кабинет, экран согласия OAuth и панель администрирования. Для работы с учётными записями и сессиями требуется запущенный [Mikh SSO API](https://github.com/KirillMikhailov442/id-api).

## Что реализовано

- Регистрация, вход по электронной почте и паролю или через Google, выход из текущей или всех сессий.
- Личный кабинет с редактированием профиля, сменой пароля, просмотром и завершением активных сессий.
- Экран согласия OAuth, просмотр подключённых приложений и отзыв выданного доступа.
- Управление OAuth-клиентами и их разрешениями.
- Панель администратора с поиском, редактированием и блокировкой пользователей, просмотром их подключённых приложений, управлением сессиями и OAuth-клиентами.
- Русский и английский интерфейс, переключение темы и поддержка PWA в production-сборке.

## Стек

- React 19, TypeScript, Vite и pnpm workspaces.
- TanStack Router для маршрутизации, Jotai для клиентского состояния.
- TanStack Query и Axios для работы с API, React Hook Form и Zod для форм, i18next для локализации.
- SCSS Modules в приложении, shadcn/ui и Tailwind CSS v4 в пакете `packages/shadcn` (`@id-app/shadcn`).
- Vitest и Playwright для тестов, ESLint и Prettier для проверок кода.

## Структура

Проект организован как монорепозиторий на pnpm workspaces. Веб-приложение находится в `apps/`, а общие пакеты — в `packages/`.

- `apps/web` — Vite-приложение с архитектурой Feature-Sliced Design (FSD) и браузерными тестами.
- `packages/api-client` — HTTP-клиент и обработка ошибок API.
- `packages/shadcn` — UI-компоненты и токены темы.

## Локальный запуск

Понадобятся Node.js 24, pnpm 12.3.4 и запущенный Mikh SSO API. Выполните из корня репозитория:

```bash
pnpm install --frozen-lockfile
cp -n .env.example .env
pnpm dev
```

По умолчанию интерфейс доступен по адресу `http://localhost:3000`. Если API запущен на другом адресе, укажите его в `API_URL` в файле `.env`.

| Переменная          | По умолчанию            | Назначение                                                                        |
| ------------------- | ----------------------- | --------------------------------------------------------------------------------- |
| `DEV_PORT`          | `3000`                  | Порт сервера разработки                                                           |
| `PREVIEW_PORT`      | `3001`                  | Порт предпросмотра сборки                                                         |
| `API_URL`           | `http://localhost:8080` | Адрес API из `.env.example`. Vite проксирует на него запросы к `/api` и `/assets` |
| `VITE_API_BASE_URL` | `/api`                  | Базовый путь API для фронтенда                                                    |

## Команды

| Команда             | Что делает                                                                |
| ------------------- | ------------------------------------------------------------------------- |
| `pnpm dev`          | Запускает сервер разработки                                               |
| `pnpm build`        | Проверяет типы и собирает приложение в `apps/web/dist/`                   |
| `pnpm preview`      | Запускает локальный предпросмотр после `pnpm build`                       |
| `pnpm lint`         | Проверяет код через ESLint                                                |
| `pnpm format`       | Форматирует файлы через Prettier                                          |
| `pnpm format:check` | Проверяет форматирование                                                  |
| `pnpm test`         | Запускает модульные и браузерные тесты                                    |
| `pnpm test:unit`    | Запускает модульные тесты                                                 |
| `pnpm test:browser` | Запускает браузерные тесты в Chromium                                     |
| `pnpm run prepare`  | Настраивает Git-хуки Husky. Обычно запускается при установке зависимостей |

Перед первым запуском браузерных тестов установите Chromium:

```bash
pnpm --filter @id-app/web exec playwright install chromium
```
