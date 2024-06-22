export type i18nType = {
  slug: SlugType;
  name: string;
  currency: {
    [key in CurrencyType]: string;
  };
  settings: {
    language: string;
    currency: string;
    yandex: string;
    phone: string;
    email: string;
    help: string;
    news: string;
    juristic: string;
    methods: string;
    add: string;
    unknown: string;
  };
};

export type SlugType = "en" | "ru";

export type CurrencyType = "RUB" | "USD" | "EUR";
