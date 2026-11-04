import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { Scope } from "@entities/scope";

import { Checkbox, FormDescription, FormField, FormItem, FormMessage } from "@id-app/shadcn";

import type { ClientFormValues } from "../../lib/client-schema";
import s from "./client-scopes-field.module.scss";

interface ClientScopesFieldProps {
  control: Control<ClientFormValues>;
  disabled: boolean;
  scopes: Scope[];
}

export const ClientScopesField = ({ control, disabled, scopes }: ClientScopesFieldProps) => {
  const { t } = useTranslation();

  return (
    <FormField
      control={control}
      name="scopes"
      render={({ field }) => (
        <FormItem>
          <fieldset className={s.scopeFieldset} disabled={disabled}>
            <legend className={s.legend}>Scopes</legend>
            <div className={s.scopes}>
              {scopes.map(({ name: scope }) => (
                <label key={scope} className={s.scope}>
                  <Checkbox
                    checked={field.value.includes(scope)}
                    className={s.scopeCheckbox}
                    onBlur={field.onBlur}
                    onCheckedChange={(checked) =>
                      field.onChange(
                        checked === true ? [...field.value, scope] : field.value.filter((value) => value !== scope)
                      )
                    }
                  />
                  {scope}
                </label>
              ))}
            </div>
          </fieldset>
          <FormDescription>{t("clients.scopesHint")}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
