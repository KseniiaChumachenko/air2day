import React from "react";
import { setupI18n } from "@lingui/core";
import { enUS, ruRU, csCZ, ukUA } from "@material-ui/core/locale";

import enMessages from "src/locales/en/messages";
import ruMessages from "src/locales/ru/messages";
import csMessages from "src/locales/cs/messages";
import ukMessages from "src/locales/uk/messages";

export interface LanguageProps {
  label: string;
  language: string;
  component: {};
  catalog: any;
}

interface UseLanguageSetup {
  [key: string]: LanguageProps;
}

export const languages: UseLanguageSetup = {
  en: {
    label: "EN 🇬🇧",
    language: "en",
    component: enUS,
    catalog: enMessages
  },
  ru: {
    label: "RU 🇷🇺",
    language: "ru",
    component: ruRU,
    catalog: ruMessages
  },
  cs: {
    label: "CZ 🇨🇿",
    language: "cs",
    component: csCZ,
    catalog: csMessages
  },
  uk: {
    label: "UA 🇺🇦",
    language: "uk",
    component: ukUA,
    catalog: ukMessages
  }
};

export function useLanguageSetup() {
  const [locale, setLocale] = React.useState(languages["en"]);

  const i18n = setupI18n({
    language: locale.language,
    catalogs: {
      en: languages["en"].catalog,
      ru: languages["ru"].catalog,
      cs: languages["cs"].catalog,
      uk: languages["uk"].catalog
    }
  });

  return {
    i18n,
    locale,
    setLocale
  };
}
