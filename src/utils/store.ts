import { defineStore } from "pinia";

export type SortFilters = "default" | "stars" | "cheap" | "expensive" | "closeness";

interface StoreInterface {
  adultsCount: number;
  children: number[];
  in: Date;
  out: null | Date;
  filters: {
    sort: SortFilters;
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
      },
    };
  },
  actions: {
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
        if (date.getTime() < this.in.getTime()) {
          this.out = this.in;
          this.in = date;
        } else {
          this.out = date;
        }
      } else {
        if (date.getTime() < this.in.getTime()) {
          this.out = this.in;
          this.in = date;
        } else {
          this.in = date;
          this.out = null;
        }
      }
    },
  },
});
