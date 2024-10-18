/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
const options: PluginOptions = {
    // You can set your default options here
};

app.use(Toast, options);
registerPlugins(app)

app.mount('#app')
