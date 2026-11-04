import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const publicApiPatterns = [
  {
    regex: "^@(app|pages|widgets|features)/[^/]+/(?!types$|model$|api$|hooks$|lib$).*",
    message: "Импорты допустимы только из корня слайса или его публичных папок: types, model, api, hooks, lib.",
  },
  {
    regex: "^@entities/[^/]+/(?!types$|ui$|model$|api$|hooks$|lib$).*",
    message: "Импорты из entities допустимы только из корня слайса или его публичных папок.",
  },
  {
    regex: "^@shared/(?!icons/)[^/]+/.*",
    message: "Импорты из shared допустимы только из его публичных папок первого уровня.",
  },
];
const noRestrictedImports = (patterns = []) => [
  "error",
  {
    patterns: [...publicApiPatterns, ...patterns],
  },
];
const restrictLayers = (layers, message = "Нижний слой не может импортировать код из вышестоящего слоя.") => ({
  regex: `^@(${layers.join("|")})(?:/|$)`,
  message,
});
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@stylistic": stylistic,
      "unused-imports": unusedImports,
    },
    rules: {
      "@stylistic/max-len": [
        "warn",
        {
          code: 120,
          tabWidth: 2,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "no-restricted-imports": noRestrictedImports(),
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
      "@stylistic/padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
        {
          blankLine: "always",
          prev: "*",
          next: ["if", "for", "switch", "try"],
        },
        {
          blankLine: "always",
          prev: ["if", "for", "switch", "try"],
          next: "*",
        },
        {
          blankLine: "always",
          prev: "*",
          next: ["const", "let", "var"],
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
      "@stylistic/lines-between-class-members": [
        "error",
        {
          enforce: [
            { blankLine: "always", prev: "*", next: "method" },
            { blankLine: "always", prev: "method", next: "*" },
          ],
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/return-await": ["error", "error-handling-correctness-only"],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/strict-boolean-expressions": "error",
    },
  },
  {
    files: ["**/*.{tsx,jsx}"],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "react/jsx-key": "error",
      "react/jsx-no-bind": "off",
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: false,
          ignoreCase: false,
          noSortAlphabetically: false,
          reservedFirst: ["key", "ref"],
          shorthandFirst: false,
          shorthandLast: false,
        },
      ],
      "react/no-array-index-key": "error",
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
    },
  },
  {
    files: ["**/index.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Program > :not(ExportNamedDeclaration):not(ExportAllDeclaration)",
          message: "index.ts должен содержать только реэкспорты public API.",
        },
        {
          selector: "ExportNamedDeclaration[source=null]",
          message: "Объявления и локальные экспорты вынесите в именованные файлы; index.ts — только для реэкспортов.",
        },
      ],
    },
  },
  {
    files: ["packages/*/src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": noRestrictedImports([
        restrictLayers(
          ["app", "pages", "widgets", "features", "entities", "shared"],
          "Workspace-пакет не может импортировать внутренние модули приложения."
        ),
      ]),
    },
  },
  {
    files: ["apps/web/src/pages/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": noRestrictedImports([restrictLayers(["app"])]),
    },
  },
  {
    files: ["apps/web/src/widgets/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": noRestrictedImports([restrictLayers(["app", "pages"])]),
    },
  },
  {
    files: ["apps/web/src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": noRestrictedImports([restrictLayers(["app", "pages", "widgets"])]),
    },
  },
  {
    files: ["apps/web/src/entities/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": noRestrictedImports([restrictLayers(["app", "pages", "widgets", "features"])]),
    },
  },
  {
    files: ["apps/web/src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [...publicApiPatterns, restrictLayers(["app", "pages", "widgets", "features", "entities"])],
        },
      ],
    },
  },
]);
