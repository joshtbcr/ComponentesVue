<template>
  <div id="divCajero">
  <modal name="modal-productos" ref="modal" :adaptive="true" :scrollable="true" :width="modalWidth" height="auto">
    <div slot="top-right">
      <button @click="$modal.hide('modal-productos')">
        ❌
      </button>
    </div>
    <div class="center">
      <Spinner v-if="!showSpinner"></Spinner>
    </div>
   
    <transition 
      <product-result v-if="showProducts" :method="agregarOrden" :products="products"/>
      
      <div id="noProductsFound" v-if="showProductsNoFound">
       <div class="col-sm-12">
        <div id="emptycard" class="card text-white bg-danger mb-3" display="center" style="max-width: 40rem;">
        <div class="card-body">
            <p class="card-text">No products were found. Try again.</p>
        </div>
        </div>
       </div>
      </div>
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
    showSpinner : Boolean,
    showProductsNoFound : Boolean,
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
#noProductsFound{
  margin: 30px;
}

.center {
  margin: auto;
  width: 25%;
  padding: 10px;
}

</style>

