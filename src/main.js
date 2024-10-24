import { createApp } from 'vue'
import App from './App.vue'


// Create the Vue application
const app = createApp(App);

// Import Bootstrap and Bootstrap-Vue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

// Import custom CSS file
import './assets/css/style.css';
import './assets/css/bootstrap.css';

// Import BootstrapVueNext
import BootstrapVueNext from 'bootstrap-vue-next';

import './assets/css/fonts/themify-icons.css';

// Use BootstrapVueNext throughout your project
app.use(BootstrapVueNext);

// Mount the Vue application
app.mount('#app');
// createApp(App).mount('#app')
