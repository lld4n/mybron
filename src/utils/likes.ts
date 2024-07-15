import { defineStore } from "pinia";

export type LikeItem = {
  id: number;
  image: string;
  name: string;
  city: string;
  added: number;
};

interface Store {
  list: LikeItem[];
}

export const useLikes = defineStore("likes", {
  state: (): Store => {
    return {
      list: [],
    };
  },
  actions: {
    addList(item: LikeItem) {
      if (this.list.findIndex((e) => e.id === item.id) === -1) {
        this.list.unshift(item);
      } else {
        this.list = this.list.filter((e) => e.id !== item.id);
      }
    },
    check(id: number) {
      return this.list.findIndex((e) => e.id === id) !== -1;
    },
  },
  persist: {
    storage: localStorage,
  },
});
