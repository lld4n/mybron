import { createApp } from "vue";
import "./style.scss";
import { router } from "./utils";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import App from "./pages/main/App.vue";
import { createYmaps } from "vue-yandex-maps";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
// 4b570f4b-b386-41b6-bd93-aff1a11c1142
// WORK 186f0adf-8b02-43df-a8ae-8c25e6a58865
createApp(App)
  .use(
    createYmaps({
      apikey: "186f0adf-8b02-43df-a8ae-8c25e6a58865",
      lang: "ru_RU",
    }),
  )
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      darkModeSelector: ".my-app-dark",
    },
  })
  .use(router)
  .use(pinia)
  .mount("#app");
