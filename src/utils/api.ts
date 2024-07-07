import ky from "ky";
import { GetOrdersResponse } from "./types.ts";

export const BACKEND_URL = "https://pre-prod.moyabron.ru";

export const api = ky.create({
  prefixUrl: BACKEND_URL,
  timeout: 100000,
});

export async function fetchOrders(auth: string) {
  const data: GetOrdersResponse = await api
    .get("orders", {
      headers: {
        Authorization: auth,
      },
    })
    .json();
  console.log(data);
  return data.orders;
}
