import { createApp } from "vue";
import "./style.scss";
import { router } from "./utils";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import App from "./pages/main/App.vue";
// import { LottieAnimation } from "loading-web-vue";

const pinia = createPinia();
// .use(LottieAnimation)
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
