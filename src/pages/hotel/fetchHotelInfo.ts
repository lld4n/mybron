import { SearchParamsOption } from "ky";
import { api, dateToApi, SearchHotelAccommodationsResponse } from "../../utils";

export async function fetchHotelInfo(id: string | string[], store: any, hotel: any) {
  const params: SearchParamsOption = {
    hotelId: String(id),
    arrivalDate: dateToApi(store.in),
    departureDate: dateToApi(store.out),
    guests: String(store.adultsCount + store.children.length),
    // language: "en",
  };
  if (store.filters.other.includes("breakfast")) {
    params.withBreakfast = true;
  }
  if (store.filters.other.includes("card")) {
    params.withCard = true;
  }
  if (store.filters.price[0] > 0) {
    params.minDailyPrice = String(store.filters.price[0]);
  }
  if (store.filters.price[1] < 50000) {
    params.maxDailyPrice = String(store.filters.price[1]);
  }
  if (store.filters.stars.length > 0) {
    params.stars = store.filters.stars.join(",");
  }
  if (store.filters.payment.length > 0) {
    params.paymentRecipients = store.filters.payment
      .map((e: string) => e.toLocaleUpperCase())
      .join(",");
  }
  const jsonData: SearchHotelAccommodationsResponse = await api
    .get("hotel/accommodations", {
      searchParams: params,
    })
    .json();
  if (jsonData.offers.length > 0) {
    // data.value = jsonData.offers[0];
    hotel.setDescription(jsonData.offers[0].descriptionDetails.description);
    hotel.setAmenities(
      jsonData.offers[0].descriptionDetails.availableAmenities.availableAmenities,
    );
    if (jsonData.offers[0].offers.offers)
      hotel.setOffers(jsonData.offers[0].offers.offers);
    hotel.setName(jsonData.offers[0].name);
    console.log(jsonData.offers[0]);
    return jsonData.offers[0];
  }
  return null;
}
