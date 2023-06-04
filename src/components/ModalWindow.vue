<template>
  <div
      class="modal fade"
      :class="{ show: show, 'd-block': show }"
      id="hotelModal"
      tabindex="-1"
      aria-labelledby=""
      aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="cerrarModal"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body" />
          <table class="table table-borderless table-sm">
            <tbody>
            <tr>
              <th>Nombre</th><td>{{ hotelData.nombre }}</td>
            </tr>
            <tr>
              <th>Dirección</th><td>{{ hotelData.direccion }}</td>
            </tr>
            <tr>
              <th>Ciudad</th><td>{{ hotelData.ciudad }}</td>
            </tr>
            <tr>
              <th>NIT</th><td>{{ hotelData.nit }}</td>
            </tr>
            <tr>
              <th>Habitaciones</th><td>{{ hotelData.num_habitaciones }}</td>
            </tr>
            </tbody>
          </table>

          <table class="table table-striped table-hover table-sm caption-top">
            <caption>Acomodaciones disponibles</caption>
            <thead>
            <tr>
              <th>Tipo</th>
              <th>Acomodación</th>
              <th>Cantidad</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="habitacion in hotelData.habitaciones" :key="habitacion.tipo_habitacion_nombre">
              <td>{{ habitacion.tipo_habitacion_nombre }}</td>
              <td>{{ habitacion.acomodacion_nombre }}</td>
              <td>{{ habitacion.cantidad_habitaciones }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
          <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="cerrarModal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Titulo",
    },
    hotelData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    cerrarModal() {
      this.$parent.modalVisible = false
    },
  },
};
</script>

<style scoped>
</style>
