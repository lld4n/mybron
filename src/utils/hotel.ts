import { defineStore } from "pinia";
import { AvailableAmenityDto, HotelReviewDto } from "./types.ts";

interface StoreInterface {
  reviews: HotelReviewDto[];
  description: string;
  amenities: AvailableAmenityDto[];
}

export const useHotel = defineStore("hotel", {
  state: (): StoreInterface => {
    return {
      description: "",
      reviews: [],
      amenities: [],
    };
  },
  actions: {
    setAmenities(list: AvailableAmenityDto[]) {
      this.amenities = list;
    },
    setReviews(list: HotelReviewDto[]) {
      this.reviews = list;
    },
    setDescription(v: string) {
      this.description = v;
    },
  },
});
