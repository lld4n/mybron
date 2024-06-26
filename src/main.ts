import { createApp } from "vue";
import "./style.scss";
import { router } from "./utils";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import App from "./pages/main/App.vue";
import { createYmaps } from "vue-yandex-maps";
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
  .use(
    createYmaps({
      apikey: "4b570f4b-b386-41b6-bd93-aff1a11c1142",
    }),
  )
  .mount("#app");
