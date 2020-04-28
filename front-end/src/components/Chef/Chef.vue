<template>
  <div id="divChef">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h3>Orders to Cook</h3>
        </div>
      </div>
    </div>    
    <Spinner v-if="!showOrders" class="mt-4"></Spinner>
    <transition enter-active-class="animated slideInUp">

      <div class="container" v-if="!showOrders">
        <div class="row">
          <div  class="card-deck col">
            <div v-for="order in orders" v-bind:key="order['OrderId']">
              <Order v-if="order.OrderStatus === 'Pending'" :orderJson="order" class="card"> </Order>
            </div>
          </div>
        </div>
      </div>


    </transition>

    <!-- <button class="btn btn-warning" v-if="showOrders" @click="loadOrders"> Re-load Orders </button> -->

  </div>
</template>

<script>
import axios from 'axios';
import Order from './PendingOrder.vue';
import Spinner from '../shared/Spinner.vue';
import {eventBus} from '../../main';


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
      const path = eventBus.backendUrl + '/ordenes/all';
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
/* #idChef{
  margin: 20%;
} */

.fade-enter{
  opacity: 0;
}

.fade-enter-active{
  transition: opacity 1s;
}

.fade-leave{
  /* opacity: 1; */
}

.fade-leave-active{
  transition: opacity 1s;
  opacity: 0;
}

</style>
