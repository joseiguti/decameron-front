// Importar estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importar funcionalidades de Vue Router
import { createRouter, createWebHistory } from 'vue-router';

// Importar funcionalidades de Vue
import { createApp } from 'vue';

// Importar el store Vuex
import store from './store';

// Importar el componente principal App.vue
import App from './App.vue';

// Importar componentes personalizados
import HomePage from "@/components/HomePage.vue";
import ListadoHoteles from '@/components/ListadoHoteles.vue';

// Importar el módulo de modal de vue-bs-modal
import Modal from "vue-bs-modal";

// Definir las rutas de la aplicación
const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/listado",
        name: "ListadoHoteles",
        component: ListadoHoteles,
    },
];

// Crear la instancia del enrutador
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Crear la instancia de la aplicación Vue
const app = createApp(App);

// Utilizar el store Vuex en la aplicación
app.use(store);

// Utilizar el enrutador en la aplicación
app.use(router);

// Utilizar el módulo de modal vue-bs-modal en la aplicación
app.use(Modal);

// Montar la aplicación en el elemento con el ID 'app'
app.mount('#app');
