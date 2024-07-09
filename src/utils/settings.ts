import { defineStore } from "pinia";

interface StoreInterface {
  phone: string;
  email: string;
}

export const useSettings = defineStore("settings", {
  state: (): StoreInterface => {
    return {
      phone: "",
      email: "",
    };
  },
  actions: {
    setEmail(t: string) {
      this.email = t;
    },
    setPhone(t: string) {
      this.phone = t;
    },
  },
});
