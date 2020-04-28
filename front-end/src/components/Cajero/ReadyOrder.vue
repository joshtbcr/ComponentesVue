<template>
  <div name="ready-orden">
     <div class="row">
          <div class="col-md-4" v-for="(order, index) in orders" :key="index">
            <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
                <div class="card-header">Order # {{ order.OrderId }}</div>

                <div class="card-body">
                    <h5 class="card-title">Order Status: {{ order.OrderStatus }}</h5>
                    <p class="card-text">Products</p>
                    <ul class="list-group">
                    <li v-for="(product,index) in order.Products" :key="index" class="list-group-item d-flex justify-content-between align-items-center" >
                        <p style="color:black;"> Product: {{ product.Name }} </p>
                        <span class="badge badge-primary badge-pill">{{ product.Servings }}</span>
                    </li>
                    </ul>
                </div>
                <div class="card-footer">
                    <button class="btn btn-secondary" @click="changeStatus(order)">Deliver order</button>
                </div>
            </div>
    
           </div>
          </div>
     </div>
  </div>
</template>


<script>
import axios from 'axios';
import {eventBus} from '../../main';

export default {
  props: {
  },
  data() {
    return {
        orders: [],
    };
  },
  methods: {
       loadOrders() {
      const path = eventBus.backendUrl + '/ordenes/Ready';
      axios.get(path)
        .then((res) => {
          this.orders = res.data.ordenes;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changeStatus(order){
      const path = eventBus.backendUrl + '/actualizarOrden';
      order.OrderStatus = 'Delivered';
      axios.put(path,order)
        .then((res) => {
          this.$forceUpdate();
          this.loadOrders();
        })
        .catch((error) => {
          console.error(error);
          order.OrderStatus = 'Ready';
          this.loadOrders();
      });

    },
  },
  components: {
  },
  created() {
      this.loadOrders();
  },
};
</script>



<style>
.card-img-top {
min-width: 100%;
max-width: 150px;
/* height: auto; */
}

</style>

