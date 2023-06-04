<template>

  <ModalWindow title="Detalle" :show="modalVisible" :hotelData="hotelSeleccionado" />

  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-message">Cargando...</div>
  </div>
  <div class="container">
    <table class="table table-sm p-3 caption-top">
      <caption>Listado de hoteles</caption>
      <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Ciudad</th>
        <th scope="col">Nit</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="hotel in hoteles" :key="hotel.id">
        <td>{{ hotel.nombre }}</td>
        <td>{{ hotel.ciudad }}</td>
        <td>{{ hotel.nit }}</td>
        <td>
          <a href="#" @click="mostrarDetalles(hotel.id)" data-bs-toggle="modal" data-bs-target="#hotelModal">Ver</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>



</template>

<script>
import axios from 'axios';

import ModalWindow from "@/components/ModalWindow.vue";

export default {
  name: 'ListadoHoteles',
  components: {
    ModalWindow
  },
  data() {
    return {
      hoteles: [],
      isLoading: true,
      hotelSeleccionado: [],
      modalVisible: false,
    };
  },
  created() {
    this.isLoading = true;
    axios
        .get('http://localhost:8000/api/hotels')
        .then(response => {
          this.hoteles = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error(error);
        });
  },
  methods: {
    openModal (){
      this.modalVisible = true
    },
    mostrarDetalles(hotelId) {
      this.isLoading = true
      axios
          .get(`http://localhost:8000/api/hotels/${hotelId}`)
          .then(response => {
            this.hotelSeleccionado = response.data;

            this.openModal()
            this.isLoading = false
          })
          .catch(error => {
            console.error(error);
          });
    },

  }
};
</script>
