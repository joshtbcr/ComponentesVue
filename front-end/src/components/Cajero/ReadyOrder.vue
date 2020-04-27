<template>
  <div name="ready-orden">

     <h5 class="display-5">Ready order</h5>
     <div class="row">

          <div class="col-md-4" v-for="(order, index) in orders">
            <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
                <div class="card-header">Order # {{ order.OrderId }}</div>
                <div class="card-body">
                    <h4 class="card-title">{{ order.OrderId }}</h4>
                    <p class="card-text">{{ order.OrderId }}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-secondary">Deliver order</button>
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
        orders: null,
    };
  },
  methods: {
       loadOrders() {
      const path = eventBus.backendUrl + '/ordenes/all';
      axios.get(path)
        .then((res) => {
          console.log(res.data);
          this.orders = res.data.ordenes;
        })
        .catch((error) => {
          console.error(error);
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

