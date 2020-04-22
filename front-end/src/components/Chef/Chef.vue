<template>
  <div id="divChef">
    <Spinner v-if="!showOrders"></Spinner>
    <!-- <transition> -->
      <div v-if="showOrders" class="card-deck">
        <div v-for="order in orders" v-bind:key="order['OrderId']">
          <Order :orderJson="order" class="card"> </Order>
          <!-- class="card border-warning mb-3" style="max-width: 20rem;"> </Orden> -->
        </div>
      </div>
    <!-- </transition> -->

    <!-- <button class="btn btn-warning" v-if="showOrders" @click="loadOrders"> Re-load Orders </button> -->



  </div>
</template>

<script>
import axios from 'axios';
import Order from './PendingOrder.vue';
import Spinner from '../shared/Spinner.vue';


export default {
  name: 'Home',
  data() {
    return {
      orders: null,
      pendingOrders: null,
      showOrders: false,
    };
  },
  methods:{
    loadOrders() {
      const path = 'http://localhost:5000/ordenes/all';
      axios.get(path)
        .then((res) => {
          console.log(res.data);
          this.orders = res.data.ordenes;
          this.showOrders = true;
          
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  components: {
    Order,
    Spinner
  },
  created(){
    this.loadOrders();
  }
};
</script>

<style scoped>
</style>
