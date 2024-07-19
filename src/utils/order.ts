import { defineStore } from "pinia";

interface Store {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  guestFirstName: string;
  guestLastName: string;
  wish: string;
  cardNumber: string;
  cardCVV: string;
  cardOwner: string;
  cardTerm: string;
}

export const useOrder = defineStore("order", {
  state: (): Store => {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      guestFirstName: "",
      guestLastName: "",
      wish: "",
      cardNumber: "",
      cardCVV: "",
      cardOwner: "",
      cardTerm: "",
    };
  },
  actions: {
    change(key: keyof Store, value: string) {
      this[key] = value;
    },
  },
});
