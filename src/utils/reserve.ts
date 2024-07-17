import { defineStore } from "pinia";
import { HotelRatingsDto, HotelReviewDto, HotelWithOffersDto } from "./types.ts";

interface StoreInterface {
  map: {
    [id: number]: {
      data: HotelWithOffersDto;
      reviews: HotelReviewDto[];
      ratings: HotelRatingsDto | null;
    };
  };
}

export const useReserve = defineStore("reserve", {
  state: (): StoreInterface => {
    return {
      map: {},
    };
  },
  actions: {
    addMap(
      id: number,
      data: HotelWithOffersDto,
      reviews: HotelReviewDto[],
      ratings: HotelRatingsDto | null,
    ) {
      this.map[id] = {
        data,
        reviews,
        ratings,
      };
    },
    check(id: number) {
      if (this.map[id]) return this.map[id];
      else return null;
    },
  },
});
