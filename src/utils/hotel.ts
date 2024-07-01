import { defineStore } from "pinia";
import { AvailableAmenityDto, HotelOfferDto, HotelReviewDto } from "./types.ts";

interface StoreInterface {
  reviews: HotelReviewDto[];
  description: string;
  amenities: AvailableAmenityDto[];
  offers: HotelOfferDto[];
  name: string;
  address: string;
  offer: HotelOfferDto | null;
  time: Time | null;
  category: number;
  guests: Guest[];
}

type Time = {
  checkIn: string;
  checkOut: string;
  timeIn: string;
  timeOut: string;
};

type Guest = {
  firstName: string;
  lastName: string;
};

export const useHotel = defineStore("hotel", {
  state: (): StoreInterface => {
    return {
      name: "",
      address: "",
      description: "",
      reviews: [],
      amenities: [],
      offers: [],
      offer: null,
      time: null,
      category: 0,
      guests: [],
    };
  },
  actions: {
    setGuestName(value: string, index: number, type: "first" | "last") {
      if (this.guests.length < index + 1) return;
      if (type === "first") this.guests[index].firstName = value;
      if (type === "last") this.guests[index].lastName = value;
    },
    createGuests(count: number) {
      this.guests = [];
      for (let i = 0; i < count; i++) {
        this.guests.push({
          firstName: "",
          lastName: "",
        });
      }
    },
    setCategory(t: number) {
      this.category = t;
    },
    setTime(t: Time) {
      this.time = t;
    },
    setAddress(s: string) {
      this.address = s;
    },
    setOffer(offer: HotelOfferDto) {
      this.offer = offer;
    },
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
