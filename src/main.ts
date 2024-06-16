import { createApp } from "vue";
import "./style.scss";
import App from "./pages/App.vue";
import { router } from "./utils";
import { createPinia } from "pinia";
const pinia = createPinia();
createApp(App).use(router).use(pinia).mount("#app");
