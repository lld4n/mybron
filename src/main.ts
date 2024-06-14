import { createApp } from "vue";
import "./style.scss";
import App from "./pages/App.vue";
import { router } from "./utils";

createApp(App).use(router).mount("#app");
