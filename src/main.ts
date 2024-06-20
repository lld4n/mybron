import { createApp } from "vue";
import "./style.scss";
import App from "./pages/App.vue";
import { router } from "./utils";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
const pinia = createPinia();
createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      darkModeSelector: ".my-app-dark",
    },
  })
  .use(router)
  .use(pinia)
  .mount("#app");
