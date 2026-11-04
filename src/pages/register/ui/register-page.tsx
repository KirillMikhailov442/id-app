import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { Fingerprint } from "lucide-react";
import { useTranslation } from "react-i18next";

import { GoogleLogin } from "@features/google-login";

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@entities/user";

import { AppRoute } from "@shared/config";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@id-app/shadcn";

import { useRegisterForm } from "../hooks/use-register-form";
import { RegisterIllustrations } from "./illustrations/register-illustrations";
import s from "./register-page.module.scss";

export const RegisterPage: FC = () => {
  const { t } = useTranslation();
  const { form, isSubmitting, handleSubmit } = useRegisterForm();

  return (
    <main className={s.page}>
      <RegisterIllustrations />

      <header className={s.logo}>
        <Fingerprint aria-hidden className={s.logoIcon} />
        <h1 className={s.title}>{t("common.brand")}</h1>
      </header>

      <Card className={s.card}>
        <CardHeader>
          <CardTitle>{t("register.title")}</CardTitle>
          <CardDescription>{t("register.description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.row}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("register.firstNameLabel")}</FormLabel>

                      <FormControl>
                        <Input
                          autoComplete="given-name"
                          placeholder={t("register.firstNamePlaceholder")}
                          type="text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("register.lastNameLabel")}</FormLabel>

                      <FormControl>
                        <Input
                          autoComplete="family-name"
                          placeholder={t("register.lastNamePlaceholder")}
                          type="text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("register.emailLabel")}</FormLabel>

                    <FormControl>
                      <Input autoComplete="email" placeholder={t("common.emailPlaceholder")} type="email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("register.passwordLabel")}</FormLabel>

                    <FormControl>
                      <Input
                        autoComplete="new-password"
                        placeholder={t("common.passwordPlaceholder")}
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      {t("register.passwordHint", { min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH })}
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className={s.submit} disabled={isSubmitting} type="submit">
                {isSubmitting ? t("register.submitting") : t("register.submit")}
              </Button>
            </form>
          </Form>

          <GoogleLogin disabled={isSubmitting} />

          <p className={s.login}>
            {t("register.loginPrompt")}{" "}
            <Link className={s.loginLink} to={AppRoute.Login}>
              {t("register.loginLink")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};
