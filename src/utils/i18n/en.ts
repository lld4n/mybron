import { i18nType } from "./type.ts";

export const en: i18nType = {
  slug: "en",
  name: "English",
  currency: {
    RUB: "Ruble",
    USD: "Dollar",
    EUR: "Euro",
  },
  settings: {
    language: "Application language",
    currency: "Currency",
    yandex: "Yandex ID",
    phone: "Phone",
    email: "Mail",
    help: "Help",
    news: "Mail",
    juristic: "Legal documents",
    methods: "Methods of entry",
    add: "Add",
    unknown: "Unknown",
  },
  reservation: {
    my: "Мои бронирования",
    zero: "Здесь будут храниться ваши бронирования",
  },
  copy: "скопирован",
  hotel: {
    buttons: {
      cancel: "Отменить бронирование",
      call: "Позвонить в отель",
      chat: "Открыть чат поддержки",
      popup: {
        close: "Закрыть",
        cancel: "Отменить",
      },
    },
    status: {
      loading: "Ожидает оплаты",
      payed: "Оплачено",
      fail: "Бронирование отменено",
      absence: "Неявка",
      number: "Номер бронирования",
      return: "К возврату",
      dft: "Чек возврата",
      button: "Перейти к оплате",
      cancel: "Бронирование отменяется...",
      hold: "Удержано за позднюю отмену",
      copy: "Номер бронирования",
    },
  },
};
