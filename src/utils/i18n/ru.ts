import { i18nType } from "./type.ts";

export const ru: i18nType = {
  slug: "ru",
  name: "Русский",
  currency: {
    RUB: "Рубль",
    USD: "Доллар",
    EUR: "Евро",
  },
  settings: {
    language: "Язык приложения",
    currency: "Валюта",
    yandex: "Яндекс ID",
    phone: "Телефон",
    email: "Почта",
    help: "Помощь",
    news: "Почта",
    juristic: "Юридические документы",
    methods: "Способы входа",
    add: "Добавить",
    unknown: "Неизвестно",
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
