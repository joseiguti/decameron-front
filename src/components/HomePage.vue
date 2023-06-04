<template>
  <div class="home container">
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-message">Cargando...</div>
    </div>
    <div v-else>
      <h1>{{msg}}</h1>
      <div :class="messageBoxType" role="alert" v-if="showMessageBox" variant="danger" dismissible @dismissed="dismissMessageBox">
        {{ message }}
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" class="form-control" v-model="nombre" maxlength="100" required>
        </div>

        <div class="form-group">
          <label for="direccion">Dirección:</label>
          <input type="text" id="direccion" class="form-control" v-model="direccion" maxlength="100" required>
        </div>

        <div class="form-group">
          <label for="ciudad">Ciudad:</label>
          <input type="text" id="ciudad" class="form-control" v-model="ciudad" maxlength="100" required>
        </div>

        <div class="form-group">
          <label for="nit">NIT:</label>
          <input type="text" id="nit" class="form-control" v-model="nit" maxlength="20" required>
        </div>

        <div class="form-group">
          <label for="num_habitaciones">Número de Habitaciones:</label>
          <input type="number" id="num_habitaciones" class="form-control" v-model.number="numHabitaciones" min="1" max="9999" required>
        </div>

        <!-- Filas dinámicas del formulario -->

        <table class="table table-sm mt-2 caption-top">
          <caption><button type="button" class="btn btn-primary btn-sm" @click="agregarCampo"><span class="bi-plus"></span></button> Distribución de la acomodación</caption>
          <thead>
            <tr>
              <th scope="col" style="width: 30%">Cantidad</th>
              <th scope="col" style="width: 30%">Tipo</th>
              <th scope="col" style="width: 30%">Acomodación</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>

        <tr v-for="(campo, index) in campos" :key="index">
          <td>
            <input class="form-control form-control-sm" v-model.number="campo.cantidadHabitaciones" placeholder="Cantidad" min="1" max="9999" required>
          </td>
          <td>
            <select class="form-select form-select-sm" v-model="campo.tipoHabitacion" required>
              <option v-for="tipoHabitacion in parameters" :value="tipoHabitacion.id" :key="tipoHabitacion.id" :selected="campo.tipoHabitacion === null">
                {{ tipoHabitacion.nombre }}
              </option>
            </select>
          </td>
          <td>
          <select class="form-select form-select-sm" v-model="campo.acomodacion" required>
              <option v-for="acomodacion in getAcomodaciones(campo.tipoHabitacion)" :value="acomodacion.id" :key="acomodacion.id" :selected="campo.acomodacion === null">
                {{ acomodacion.nombre }}
              </option>
            </select>
          </td>
          <td class="text-center">
            <button class="btn btn-sm btn-danger" type="button" @click="eliminarCampo(index)">
              <span class="bi-trash"></span>
            </button>
          </td>
        </tr>
          </tbody>
        </table>

        <button type="submit" class="btn btn-primary">Guardar</button>

      </form>

    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'HomePage',
  data() {
    return {
      nombre: '',
      direccion: '',
      ciudad: '',
      nit: '',
      numHabitaciones: 0,
      message: '',
      showMessageBox: false,
      messageBoxType: "",
      campos: [] // Campos dinámicos del formulario
    }
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['parameters']),
    isLoading() {
      return this.$store.state.isLoading;
    },
    parameters(){
      return this.$store.state.parameters;
    }
  },
  created() {
    this.fetchParameters();
    this.agregarCampo(); // Agregar un conjunto de campos inicial al cargar la página
  },
  mounted() {

  },
  methods: {
    ...mapActions(['fetchParameters', 'showLoading']),
    showMessage(message, messageBoxType = 'primary') {
      this.message = message;
      this.showMessageBox = true;
      this.messageBoxType = 'alert alert-'+messageBoxType;
    },

    dismissMessageBox() {
      this.showMessageBox = false;
    },
    submitForm() {

      this.numHabitaciones = parseInt(this.numHabitaciones);

      const habitacionesAgregadas = this.campos.reduce((total, campo) => {
        const cantidad = parseInt(campo.cantidadHabitaciones, 10);
        return  total + (cantidad || 0);
      }, 0);

      if (this.numHabitaciones !== habitacionesAgregadas) {
        this.showMessage('El número de habitaciones del hotel debe ser igual a la suma de las habitaciones agregadas.', 'danger');
        return;
      }

      const combinaciones = {};
      let hasDuplicates = false;

      for (const campo of this.campos) {
        const tipoHabitacion = campo.tipoHabitacion;
        const acomodacion = campo.acomodacion;

        if (tipoHabitacion && acomodacion) {
          const combinacion = tipoHabitacion + '-' + acomodacion;

          if (combinaciones[combinacion]) {
            hasDuplicates = true;
            break;
          } else {
            combinaciones[combinacion] = true;
          }
        }
      }

      if (hasDuplicates) {
        this.showMessage('No se permiten combinaciones de tipo de habitación y acomodación duplicadas.', 'danger');
        return;
      }

      const formData = {
        nombre: this.nombre,
        direccion: this.direccion,
        ciudad: this.ciudad,
        nit: this.nit,
        num_habitaciones: this.numHabitaciones,
        campos: this.campos.map(campo => ({
          cantidadHabitaciones: campo.cantidadHabitaciones,
          tipoHabitacion: campo.tipoHabitacion,
          acomodacion: campo.acomodacion
        }))
      };

      this.$store.dispatch('showLoading');
      fetch('http://localhost:8000/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
          .then(response => {
            this.$store.dispatch('stopLoading');
            if (response.status === 201) {
              this.showMessage('¡Los datos se guardaron correctamente!', 'success');
            }else if (response.status === 400) {
              this.showMessage("El hotel ya existe, ingrese otro por favor.", 'danger');
            }
          })
          .then(data => {
            this.$store.dispatch('stopLoading');
            // Aquí puedes manejar la respuesta exitosa
            console.log('Response:', data);
          })
          .catch(error => {
            this.$store.dispatch('stopLoading');
            // Aquí puedes manejar el error de la solicitud
            console.error('Error saving data:', error);
            this.showMessage('Error al guardar los datos.', 'danger');
          });

    },
    async fetchParameters() {
      await this.$store.dispatch('fetchParameters');
    },
    getAcomodaciones(tipoHabitacionId) {
      const tipoHabitacion = this.parameters.find(t => t.id === tipoHabitacionId);
      if (tipoHabitacion) {
        const acomodaciones = tipoHabitacion.acomodaciones || [];
        if (!acomodaciones.some(a => a.id === null)) {
          acomodaciones.unshift({ id: null, nombre: 'Seleccione...' });
        }
        return acomodaciones;
      } else {
        return [];
      }
    },
    agregarCampo() {
      this.campos.push({
        cantidadHabitaciones: 0,
        tipoHabitacion: null,
        acomodacion: null
      });
    },
    eliminarCampo(index) {
      this.campos.splice(index, 1);
    },
  }
}
</script>

