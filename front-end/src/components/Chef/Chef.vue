<template>
  <div>

    <template v-if="mostrarOrdenes">
      <div v-for="orden in ordenes" v-bind:key="orden['numeroOrden']">
        <Orden :ordenJson="orden"> </Orden>
      </div>
    </template>

    <button @click="cargarOrdenes"> Load orders </button>
  </div>
</template>

<script>
import axios from 'axios';
import Orden from './OrdenPendiente.vue';


export default {
  name: 'Home',
  data() {
    return {
      msg: 'Hello!',
      ordenes: null,
      ordenesPendientes: null,
      mostrarOrdenes: false,
    };
  },
  methods:{
    cargarOrdenes() {
      const path = 'http://localhost:5000/ordenes/all';
      axios.get(path)
        .then((res) => {
          console.log(res.data);
          this.ordenes = res.data.ordenes;
          this.mostrarOrdenes = true;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  components: {
    Orden
  }
};
</script>

<style scoped>

</style>