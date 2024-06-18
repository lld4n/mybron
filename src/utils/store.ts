import { defineStore } from "pinia";

interface StoreInterface {
  adultsCount: number;
  childrenCount: number;
  in: null | Date;
  out: null | Date;
}

export const useStore = defineStore("store", {
  state: (): StoreInterface => {
    return {
      adultsCount: 2,
      childrenCount: 0,
      in: null,
      out: null,
    };
  },
  actions: {
    changeCounts(adults: number, children: number) {
      if (adults >= 1 || adults <= 6) this.adultsCount = adults;
      if (children >= 0 || children <= 6) this.childrenCount = children;
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
