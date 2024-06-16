import { defineStore } from "pinia";

export const useStore = defineStore("counter", {
  state: () => {
    return {
      adultsCount: 2,
      childrenCount: 0,
    };
  },
  actions: {
    changeCounts(adults: number, children: number) {
      if (adults >= 1 || adults <= 6) this.adultsCount = adults;
      if (children >= 0 || children <= 6) this.childrenCount = children;
    },
  },
});
