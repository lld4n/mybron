import { defineStore } from "pinia";
import { HotelWithCheapestOfferDto, LiveSearchResultDto } from "./types.ts";

export const OtherFiltersValues: OtherFilters[] = ["card", "breakfast"];
export type OtherFilters = "card" | "breakfast";

export const PaymentFiltersValues: PaymentFilters[] = ["hotel", "agency"];
export type PaymentFilters = "hotel" | "agency";

export type StarsFilters = 1 | 2 | 3 | 4 | 5;
export const StarsFiltersValues: StarsFilters[] = [1, 2, 3, 4, 5];

export type SortFilters = "default" | "stars" | "cheap" | "expensive" | "closeness";

export type Key = "payment" | "stars" | "other";
export type Array = StarsFilters[] | PaymentFilters[] | OtherFilters[];

export type Message = {
  type: "copy" | "cancel" | "fail cancel" | "cancel fine" | "contact";
  text: string;
  desc?: string;
  out?: boolean;
} | null;

type Phone = {
  code: string;
  ph: string;
};

type Search = {
  type: "city" | "hotel";
  name: string;
  id: number;
} | null;

interface StoreInterface {
  checked: boolean;
  search: Search;
  adultsCount: number;
  children: number[];
  in: Date;
  out: null | Date;
  message: Message;
  hotels: HotelWithCheapestOfferDto[];
  auth: string;
  phone: Phone;
  near: LiveSearchResultDto[];
  filters: {
    sort: SortFilters;
    payment: PaymentFilters[];
    stars: StarsFilters[];
    other: OtherFilters[];
    price: [number, number];
  };
}

export type Geo = {
  city: string;
  latitude: number;
  longitude: number;
  country_code: string;
};

export const useStore = defineStore("store", {
  state: (): StoreInterface => {
    return {
      checked: false,
      hotels: [],
      search: null,
      adultsCount: 2,
      children: [],
      in: new Date(new Date().setHours(0, 0, 0, 0)),
      out: new Date(
        new Date(new Date().setHours(0, 0, 0, 0)).setDate(new Date().getDate() + 1),
      ),
      message: null,
      auth: "",
      phone: { code: "ru", ph: "7" },
      near: [],
      filters: {
        sort: "default",
        payment: [],
        stars: [],
        other: [],
        price: [0, 50000],
      },
    };
  },
  actions: {
    setNear(n: LiveSearchResultDto[]) {
      this.near = n;
    },
    setPhone(p: Phone) {
      this.phone = p;
    },
    setAuth(t: string) {
      this.auth = t;
    },
    check() {
      this.checked = true;
    },
    setHotels(list: HotelWithCheapestOfferDto[]) {
      this.hotels = list;
    },
    setSearch(c: Search) {
      this.search = c;
      this.hotels = [];
    },
    setMessage(mes: Message) {
      this.message = mes;
      if (!mes?.out) {
        setTimeout(() => {
          if (this.message) this.message.out = true;
        }, 4800);
        setTimeout(() => {
          this.message = null;
        }, 5000);
      } else {
        setTimeout(() => {
          this.message = null;
        }, 200);
      }
    },
    changeFiltersPrice(newValue: [number, number]) {
      this.filters.price = newValue;
      this.hotels = [];
    },
    allFilters(key: Key, array: Array) {
      if (this.filters[key].length !== array.length) {
        // @ts-ignore
        this.filters[key] = array;
      } else {
        this.filters[key] = [];
      }
      this.hotels = [];
    },
    changeFilters(key: Key, value: any) {
      if (this.filters[key].filter((e) => e === value).length > 0) {
        //@ts-ignore
        this.filters[key] = this.filters[key].filter((e) => e !== value);
      } else {
        //@ts-ignore
        this.filters[key].push(value);
      }
      this.hotels = [];
    },
    changeFiltersSort(value: SortFilters) {
      this.filters.sort = value;
      this.hotels = [];
    },
    changeAdults(adults: number) {
      if (adults >= 1 || adults <= 4) this.adultsCount = adults;
      this.hotels = [];
    },
    addChildren(age: number) {
      if (this.children.length < 4) this.children.push(age);
      this.hotels = [];
    },
    removeChildren(index: number) {
      if (index >= 0 && index < this.children.length) {
        this.children.splice(index, 1);
        this.hotels = [];
      }
    },
    changeDate(date: Date) {
      if (!this.out) {
        if (this.in.getTime() > date.getTime()) {
          this.out = this.in;
          this.in = date;
        } else {
          this.out = date;
        }
      } else {
        this.in = date;
        this.out = null;
      }
      this.hotels = [];
    },
  },
});
