import { defineStore } from "pinia";

interface StoreInterface {
  adultsCount: number;
  children: number[];
  in: null | Date;
  out: null | Date;
}

export const useStore = defineStore("store", {
  state: (): StoreInterface => {
    return {
      adultsCount: 2,
      children: [],
      in: null,
      out: null,
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
      if (!this.in) {
        if (!this.out || this.out.getTime() > date.getTime()) this.in = date;
        else {
          this.in = this.out;
          this.out = date;
        }
      } else if (this.in.getTime() > date.getTime()) {
        this.out = this.in;
        this.in = date;
      } else if (!this.out) this.out = date;
      else this.out = date;
    },
    clearDate(out: boolean) {
      if (!out) this.in = null;
      else this.out = null;
    },
  },
});
