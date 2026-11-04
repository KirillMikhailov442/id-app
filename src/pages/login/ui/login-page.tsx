import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { Fingerprint } from "lucide-react";
import { useTranslation } from "react-i18next";

import { GoogleLogin } from "@features/google-login";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@id-app/shadcn";

import { useLoginForm } from "../hooks/use-login-form";
import { LoginIllustrations } from "./illustrations/login-illustrations";
import s from "./login-page.module.scss";

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  const { form, isSubmitting, handleSubmit } = useLoginForm();

  return (
    <main className={s.page}>
      <LoginIllustrations />

      <header className={s.logo}>
        <Fingerprint aria-hidden className={s.logoIcon} />
        <h1 className={s.title}>{t("common.brand")}</h1>
      </header>

      <Card className={s.card}>
        <CardHeader>
          <CardTitle>{t("login.title")}</CardTitle>
          <CardDescription>{t("login.description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className={s.form} onSubmit={handleSubmit}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("login.emailLabel")}</FormLabel>

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
                    <FormLabel>{t("login.passwordLabel")}</FormLabel>

                    <FormControl>
                      <Input
                        autoComplete="current-password"
                        placeholder={t("common.passwordPlaceholder")}
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className={s.submit} disabled={isSubmitting} type="submit">
                {isSubmitting ? t("login.submitting") : t("login.submit")}
              </Button>
            </form>
          </Form>

          <GoogleLogin disabled={isSubmitting} />

          <p className={s.register}>
            {t("login.registerPrompt")}{" "}
            <Link className={s.registerLink} to={AppRoute.Register}>
              {t("login.registerLink")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};
