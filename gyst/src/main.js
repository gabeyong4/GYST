import { createApp } from 'vue' // Put Vue if needed
import App from './App.vue';
import router from './router/index.js';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap package for the Progress Bar
import {auth} from "./firebase" 
import "@fortawesome/fontawesome-free/js/all" // the icons on the side navigation bar
// import 'chartkick/chart.js'

let app
// to ensure that the page only loads when it has retrieved the user details
auth.onAuthStateChanged(() => {
    if (!app) {
        createApp(App).use(router).use(BootstrapIconsPlugin).mount('#app')
    }
})
