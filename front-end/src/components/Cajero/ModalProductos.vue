<template>
  <div id="divCajero">
  <modal name="modal-productos" ref="modal" :adaptive="true" :scrollable="true" :width="modalWidth" height="auto">
    <Spinner v-if="!showProducts"></Spinner>
    <transition 
      <product-result :method="agregarOrden" :products="products"/>
    </transition>
 </modal>
  </div>
</template>


<script>
import axios from 'axios';
import Spinner from '../shared/Spinner.vue';
import {eventBus} from '../../main';
import ProductResult from './ProductResult.vue';

export default {
  props: {
    method: { type: Function },
    productValue : String,
    showProducts : Boolean,
    products : Array,
  },
  data() {
    return {
      modalWidth: '80%',
    };
  },
  methods: {
    agregarOrden(product){
        console.log('agregar Orden de ' +product.Name);
        //this.orderProducts.push(product);
        this.method(product);
    },
  },
  components: {
    Spinner,
    ProductResult
  },
};
</script>


<style>

</style>

