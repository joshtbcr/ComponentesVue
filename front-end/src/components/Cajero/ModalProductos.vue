<template>
  <div id="divCajero">
  <modal name="modal-productos" ref="modal" :adaptive="true" :scrollable="true" width="80%" height="auto">
    <Spinner v-if="!showProducts"></Spinner>
    <transition 
      <div class="container">
      </div>
    </transition>
 </modal>
  </div>
</template>


<script>
import axios from 'axios';
import Spinner from '../shared/Spinner.vue';
import {eventBus} from '../../main';

export default {
  props: {
    method: { type: Function },
    productValue : String,
    showProducts : Boolean
  },
  data() {
    return {
      products: [],
      orderProducts: [],
      ingredients: [],
    };
  },
  methods: {
    getProducts() {

    },
    agregarOrden(product){
        console.log('agregar Orden de ' +product.Name);
        //this.orderProducts.push(product);
        this.method(product);
  
    },
    replaceWhiteSpace: function (a) {
            let string = a.replace(' ','');
            return string;
        },
  },
  components: {
    Spinner
  },
  created() {
  },
};
</script>



<style>

</style>

