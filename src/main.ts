import { createApp } from "vue";

import PrimeVue from "primevue/config"

import App from "@/App.vue"
import PrimeVueConfig from "@/configs/primevue"

import "@/assets/styles/index.css"

createApp(App).use(PrimeVue, PrimeVueConfig).mount("#app")
