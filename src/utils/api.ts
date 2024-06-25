import ky from "ky";

export const BACKEND_URL = "http://77.105.172.62:8080";

export const api = ky.create({
  prefixUrl: BACKEND_URL,
  timeout: 100000,
});
