import { defineStore } from "pinia";

export const OtherFiltersValues: OtherFilters[] = ["card", "breakfast"];
export type OtherFilters = "card" | "breakfast";

export const PaymentFiltersValues: PaymentFilters[] = ["hotel", "agency"];
export type PaymentFilters = "hotel" | "agency";

export type StarsFilters = 1 | 2 | 3 | 4 | 5;
export const StarsFiltersValues: StarsFilters[] = [1, 2, 3, 4, 5];

export type SortFilters = "default" | "stars" | "cheap" | "expensive" | "closeness";

export type Key = "payment" | "stars" | "other";
export type Array = StarsFilters[] | PaymentFilters[] | OtherFilters[];
interface StoreInterface {
  adultsCount: number;
  children: number[];
  in: Date;
  out: null | Date;
  filters: {
    sort: SortFilters;
    payment: PaymentFilters[];
    stars: StarsFilters[];
    other: OtherFilters[];
  };
}

export const useStore = defineStore("store", {
  state: (): StoreInterface => {
    return {
      adultsCount: 2,
      children: [],
      in: new Date(new Date().setHours(0, 0, 0, 0)),
      out: new Date(
        new Date(new Date().setHours(0, 0, 0, 0)).setDate(new Date().getDate() + 1),
      ),
      filters: {
        sort: "default",
        payment: [],
        stars: [],
        other: [],
      },
    };
  },
  actions: {
    allFilters(key: Key, array: Array) {
      if (this.filters[key].length !== array.length) {
        // @ts-ignore
        this.filters[key] = array;
      } else {
        this.filters[key] = [];
      }
    },
    changeFilters(key: Key, value: any) {
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
    changeAdults(adults: number) {
      if (adults >= 1 || adults <= 4) this.adultsCount = adults;
    },
    addChildren(age: number) {
      if (this.children.length < 4) this.children.push(age);
    },
    removeChildren(index: number) {
      if (index >= 0 && index < this.children.length) {
        this.children.splice(index, 1);
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
    },
  },
});
