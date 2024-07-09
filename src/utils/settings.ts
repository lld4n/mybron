import { defineStore } from "pinia";

interface StoreInterface {
  phone: string;
}

export const useSettings = defineStore("settings", {
  state: (): StoreInterface => {
    return {
      phone: "",
    };
  },
  actions: {
    setPhone(t: string) {
      this.phone = t;
    },
  },
});
