import { createApp } from "vue";
import "./style.css";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(createPinia())
  .mount("#app");
