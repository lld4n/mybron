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
  reservation: {
    my: string;
    zero: string;
  };
  copy: string;
  hotel: {
    reviews: {
      name: string;
      button: string;
    };
    estimated: {
      in: string;
      out: string;
    };
    amenity: string;
    total: {
      title: string;
      tax: string;
      total: string;
    };
    buttons: {
      cancel: string;
      call: string;
      chat: string;
      message: {
        canceled: string;
      };
      popup: {
        close: string;
        cancel: string;
      };
    };
    status: {
      loading: string;
      payed: string;
      fail: string;
      absence: string;
      number: string;
      return: string;
      dft: string;
      button: string;
      cancel: string;
      hold: string;
      copy: string;
    };
  };
};

export type SlugType = "en" | "ru";

export type CurrencyType = "RUB" | "USD" | "EUR";
