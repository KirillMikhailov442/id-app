# AGENTS.md

## Project Overview

id-app is the client-side application.

### Stack

- TypeScript
- React 19
- Vite
- pnpm
- Tailwind CSS v4 — только внутри `packages/shadcn` (workspace package, alias `@id-app/shadcn`)
- SCSS (модули `*.module.scss`) — стилизация приложения
- shadcn/ui components live in `packages/shadcn` (workspace package, alias `@id-app/shadcn`)
- Jotai for client-side state
- `@tanstack/react-router` for routing
- Conventional Commits for Git

## Agent Communication

- Keep every response **as short as possible**.
- Answer **only what is relevant to the current task**.
- Do not add unnecessary explanations, summaries, greetings, or repeated information.
- Prefer concise bullet points over long prose.
- When reporting completed work, briefly state what was changed and mention only important caveats or validation results.
- Ask questions only when missing information blocks a correct implementation.

## General Development Rules

- Follow Feature-Sliced Design strictly.
- Prefer solutions that fit the existing project architecture.
- Clarify ambiguities before writing code when they prevent a correct implementation.
- Always update `index.ts` when adding a new public export.
- Use `index.ts` only as a public API barrel for re-exports. Put type/interface declarations, constants, components, models, and logic in dedicated named files; never define them in `index.ts`.
- Generate complete files. Never use placeholders such as `// ... rest of code`.
- Use `@id-app/shadcn` components whenever an appropriate component exists.
- Never leave unfinished implementation stubs such as `TODO: implement later`.
- Follow ESLint and TypeScript checks.
- Always describe component props with a named `interface` in the component file. Do not use type aliases or inline object types for component props.
- Store other types and interfaces in a `types/` folder with an `index.ts` public API (for example, `pages/profile/types/`). Schema-inferred form types may stay in the schema file (for example, `LoginFormValues`). Remove `types/` when it has no remaining definitions. Use `interface` for object shapes; reserve `type` for unions, computed, inferred, and other types that cannot be expressed as an interface.
- Do not introduce unnecessary dependencies.
- Decompose code: prefer many small files over one growing file. Extract subcomponents, hooks, helpers and constants into their own files instead of keeping them inline.
- Do not spread magic numbers or magic values across the code. Extract them into named constants in a dedicated constants file (`<name>.const.ts` or a `const` file near the code that uses them).

## Feature-Sliced Design

The project uses the following layer hierarchy:

`shared → entities → features → widgets → pages → app`

Dependencies may only go from higher layers to lower layers.

- `shared` → no project-layer dependencies.
- `entities` → may import `shared`.
- `features` → may import `shared` and `entities`.
- `widgets` → may import `shared`, `entities`, and `features`.
- `pages` → may import everything except `app`.
- `app` → may import any project layer.

Lower layers must never import higher layers.

### Standard Slice Structure

For `entities`, `features`, `widgets`, and `pages`:

```text
<layer>/<slice>/
├── index.ts
├── ui/
├── model/
│   ├── <name>.const.ts
│   └── <name>.model.ts
├── types/
│   ├── <name>.types.ts
│   └── index.ts
├── api/
├── hooks/
└── lib/
```

- `index.ts` is the public API and is required.
- `ui/` contains UI components.
- `model/` contains state and constants.
- `types/` contains non-component types and interfaces; component props interfaces stay in their component files.
- `api/` contains API services.
- `hooks/` contains custom hooks; one hook per file.
- `lib/` contains utilities and helpers.

## `app` Structure

```text
app/
├── app.tsx
├── providers/
│   ├── app.tsx
│   └── index.ts
├── layouts/
│   ├── <layout-name>/
│   │   ├── index.ts
│   │   └── ui/
│   │       ├── <layout-name>.tsx
│   │       └── index.ts
│   └── index.ts
├── router/
│   ├── index.ts
│   └── routes/
└── styles/
    └── globals.scss
```

- `providers/` contains application providers. Keep each provider in a separate file.
- `app.tsx` composes the main providers.
- `layouts/` contains reusable page layouts.
- `router/` contains all routing logic.
- `styles/globals.scss` contains global styles.

## Styling

- Style application code with SCSS. Use CSS modules (`*.module.scss`) for components; use SCSS variables and mixins instead of Tailwind utilities.
- Global styles live in `app/styles/globals.scss`.
- Do not use Tailwind classes in `src/` layers (`shared`, `entities`, `features`, `widgets`, `pages`, `app`). Tailwind is reserved for `packages/shadcn` components only.
- Theme design tokens (`--background`, `--foreground`, `--primary`, `--border`, `--radius`, etc.) come from `@id-app/shadcn/styles/globals.css` and may be consumed in SCSS via `var(...)`.

## Imports

Use these aliases:

- `@shared/*`
- `@entities/*`
- `@features/*`
- `@widgets/*`
- `@pages/*`
- `@app/*`

Import depth is restricted:

- `shared` — one folder maximum.
  - Allowed: `@shared/config`
  - Forbidden: `@shared/config/hooks`
- `entities` — two folders maximum.
  - Allowed: `@entities/user/hooks`
  - Forbidden: `@entities/user/lib/avatar.ts`
- `features`, `widgets`, `pages`, and `app` — two folders maximum.

Never bypass these import-depth rules.

## State Management

Use Jotai with singleton model classes.

### Model Rules

- Constants go into `<name>.const.ts`.
- Model classes are singletons by default.
- Prefix the class with `_`.
- Export the ready-to-use singleton without the prefix.

Example:

```typescript
class _MainModel {
  // atoms and methods
}
export const MainModel = new _MainModel();
```

- Models contain the public atoms and the methods responsible for local state management.
- Hooks in `hooks/` connect components to models using `useAtom`.
- Export the model instance, constants, and public hooks through `index.ts`.
- Do not create atoms outside model classes.

## Routing

Use `@tanstack/react-router` with programmatic route definitions, not file-based routing.

All routes belong under:

```text
app/router/routes/
```

### Route Structure

```text
app/router/routes/
├── __root.tsx
└── main.tsx
```

- `__root.tsx` is the root route and contains the application providers and `Outlet`.
- Standalone pages are defined directly in `routes/`.
- Groups of routes sharing a layout use a `_ <layout>`-style route group directory, e.g. `_app/`.
- `layout.tsx` defines the parent route and renders the appropriate layout with an `Outlet`.
- Child routes are registered through `addChildren`.
- Route path constants should preferably live in `shared/config/route.const.ts`.
- Use `useNavigate`, `useParams`, and `useSearch` from `@tanstack/react-router`.

### Creating a Route

For a page with a shared layout:

1. Create the `_ <layout>` route group if necessary.
2. Define the parent route in `layout.tsx`.
3. Import the layout from `app/layouts/`.
4. Create the child route with `createRoute`.
5. Register child routes through `parentRoute.addChildren([...])`.

For a page without a shared layout, create the route directly under `routes/` and register it from `__root.tsx`.

## Error Handling

- Never ignore errors.
- Every asynchronous operation must have appropriate error handling.
- Use `try/catch` or `.catch()` where applicable.
- Show user-facing errors through the UI layer when appropriate.
- Do not leave rejected promises unhandled.

## Forbidden

The following are strictly prohibited:

- `any`.
- Imports deeper than the allowed depth.
- Direct DOM manipulation; use refs and React abstractions.
- Hardcoded URLs or secrets.
- Ignoring error handling.
- Creating Jotai atoms outside model classes.
- Unimplemented placeholders such as `TODO: implement later`.
- Violating ESLint or TypeScript rules.
- Adding public exports without updating the corresponding `index.ts`.

## Git

Use Conventional Commits for commit messages.

Commit message format: `<type>: <message>`, where `<type>` matches the type of the current branch (`fix`, `feat`, `styles`, etc.).

Examples:

```text
feat: add project creation form
fix: handle project loading error
refactor: extract project service
test: add project service tests
```

## Task Completion Checklist

Before considering a task complete:

1. Verify the implementation follows FSD.
2. Verify import depth and layer dependencies.
3. Verify public exports in `index.ts`.
4. Verify error handling.
5. Run relevant TypeScript and ESLint checks when possible.
6. Respond with only a concise summary of the result.
