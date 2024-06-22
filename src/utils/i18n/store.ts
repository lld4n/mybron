import { defineStore } from "pinia";
import { CurrencyType, i18nType, SlugType } from "./type.ts";
import { ru } from "./ru.ts";
import { en } from "./en.ts";

export const currencies: CurrencyType[] = ["RUB", "USD", "EUR"];

export const languages: {
  [key in SlugType]: i18nType;
} = {
  ru: ru,
  en: en,
};

interface StoreInterface {
  i18n: i18nType;
  currency: CurrencyType;
}

export const useInter = defineStore("i18n", {
  state: (): StoreInterface => {
    return {
      i18n: ru,
      currency: "RUB",
    };
  },
  actions: {
    changeLanguage(key: SlugType) {
      this.i18n = languages[key];
    },
    changeCurrency(key: CurrencyType) {
      this.currency = key;
    },
  },
});
