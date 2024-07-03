import { defineStore } from "pinia";
import { AvailableAmenityDto, HotelOfferDto, HotelReviewDto } from "./types.ts";
import { PaymentFilters } from "./store.ts";

export const MealsFiltersValues: MealsFilters[] = ["included", "not included"];
type MealsFilters = "included" | "not included";

export const BedsFiltersValues: BedsFilters[] = ["double", "single", "bunk", "sofa"];
type BedsFilters = "double" | "single" | "bunk" | "sofa";

type SortFilters = "cheap" | "expensive";

export type KeyRooms = "payment" | "beds" | "meals";
export type ArrayRooms = MealsFilters[] | PaymentFilters[] | BedsFilters[];
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
  info: Guest;
  filters: {
    sort: SortFilters;
    payment: PaymentFilters[];
    beds: BedsFilters[];
    meals: MealsFilters[];
    amenities: string[];
    price: [number, number];
  };
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
      info: {
        firstName: "",
        lastName: "",
      },
      filters: {
        sort: "cheap",
        payment: [],
        meals: [],
        amenities: [],
        beds: [],
        price: [0, 50000],
      },
    };
  },
  actions: {
    setAmenitiesFilter(list: string[]) {
      const set: Set<string> = new Set();
      for (const item of list) {
        set.add(item);
      }
      this.filters.amenities = Array.from(set);
    },
    changeFiltersPrice(newValue: [number, number]) {
      this.filters.price = newValue;
    },
    allFilters(key: KeyRooms, array: ArrayRooms) {
      if (this.filters[key].length !== array.length) {
        // @ts-ignore
        this.filters[key] = array;
      } else {
        this.filters[key] = [];
      }
    },
    changeFilters(key: KeyRooms, value: any) {
      if (this.filters[key].filter((e) => e === value).length > 0) {
        //@ts-ignore
        this.filters[key] = this.filters[key].filter((e) => e !== value);
      } else {
        //@ts-ignore
        this.filters[key].push(value);
      }
    },
    changeFiltersSort(value: SortFilters) {
      this.filters.sort = value;
    },
    setInfo(c: Guest) {
      this.info = c;
    },
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
