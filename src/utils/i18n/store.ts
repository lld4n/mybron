import { defineStore } from "pinia";
import { CurrencyType, SlugType } from "./type.ts";
import { i18nTypeRU, ru } from "./ru.ts";
import { en } from "./en.ts";

export const currencies: CurrencyType[] = ["RUB", "USD", "EUR"];

export const languages: {
  [key in SlugType]: i18nTypeRU;
} = {
  ru: ru,
  en: en,
};

interface StoreInterface {
  i18n: i18nTypeRU;
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
      window.Telegram.WebApp.CloudStorage.setItem("language", this.i18n.slug);
    },
    changeCurrency(key: CurrencyType) {
      this.currency = key;
    },
  },
});
