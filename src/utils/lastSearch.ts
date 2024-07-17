import { defineStore } from "pinia";

type LastSearchItem = {
  id: number;
  guests: number;
  image?: string;
  in: number;
  out: number;
  name: string;
  type: "city" | "hotel";
};

interface Store {
  list: LastSearchItem[];
}

export const useLastSearch = defineStore("lastSearch", {
  state: (): Store => {
    return {
      list: [],
    };
  },
  actions: {
    addList(item: LastSearchItem) {
      if (this.list.findIndex((e) => e.id === item.id) === -1) {
        this.list.unshift(item);
      } else {
        const b: LastSearchItem[] = [];
        for (const last of this.list) {
          if (last.id === item.id) {
            last.guests = item.guests;
            last.in = item.in;
            last.out = item.out;
            last.image = item.image;
            b.unshift(last);
          } else {
            b.push(last);
          }
        }
        this.list = b;
      }
    },
  },
  persist: {
    storage: localStorage,
  },
});
