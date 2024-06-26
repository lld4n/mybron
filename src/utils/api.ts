import ky from "ky";

export const BACKEND_URL = "https://pre-prod.moyabron.ru";

export const api = ky.create({
  prefixUrl: BACKEND_URL,
  timeout: 100000,
});
