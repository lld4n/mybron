import { defineStore } from "pinia";
import { AvailableAmenityDto, HotelOfferDto, HotelReviewDto } from "./types.ts";

interface StoreInterface {
  reviews: HotelReviewDto[];
  description: string;
  amenities: AvailableAmenityDto[];
  offers: HotelOfferDto[];
  name: string;
}

export const useHotel = defineStore("hotel", {
  state: (): StoreInterface => {
    return {
      name: "",
      description: "",
      reviews: [],
      amenities: [],
      offers: [],
    };
  },
  actions: {
    setName(n: string) {
      this.name = n;
    },
    setOffers(list: HotelOfferDto[]) {
      this.offers = list;
    },
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
