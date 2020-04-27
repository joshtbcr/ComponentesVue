<template>
  <div name="product-result" class="container">
   <div class="row">
     <div :class="tableClass">
       <h5>Product list</h5>
          <table class="table table-hover">
              <thead>
                  <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(product, index) in products" :key="product.Id" v-on:click="clickList(product)">
                    <td>{{ product.Id }}</td>
                    <td>{{ product.Name }}</td>
                    <td>{{ product.PricePerServing }}</td>
                    <td>
                      <div class="btn-group" role="group" id="modalProductoApp">
                      <button type="button" id="show-info"  @click="showInfo()" class="btn btn-info">More info</button>
                      <button type="button" class="btn btn-success" @click="agregarOrden(product)">Add to order</button>
                      </div>
                    </td>
                  </tr>
              </tbody>
          </table>
    </div>
      <product-info  v-if="isHidden" :product="product" :sourceimg="sourceimg"/>
    </div>
   </div>
  </div>

</template>


<script>
import axios from 'axios';
import Spinner from '../shared/Spinner.vue';
import {eventBus} from '../../main';
import ProductInfo from './ProductInfo.vue';

export default {
  props: {
    method: { type: Function },
    products : Array,
  },
  data() {
    return {
      showOrders: false,
      isHidden: false,
      orderProducts: [],
      ingredients: [],
      infoproducto: [],
      product : {},
      sourceimg : '',
      tableClass : 'col-sm-12',
    };
  },
  methods: {
    getBooks() {
      console.log('product result ' +this.products);
    },
    showInfo() {
        this.isHidden = true;
        this.tableClass = 'col-sm-6';
    },
    clickList(productClicked){
        this.isHidden = true;
        console.log('PRODUCTO: ' +productClicked);
        this.product = productClicked;
        this.sourceimg = this.replaceWhiteSpace(productClicked.Image);
        this.tableClass = 'col-sm-6';
    },
    agregarOrden(product){
        console.log('agregar Orden de ' +product.Name);
        //this.orderProducts.push(product);
        this.method(product);
        this.tableClass = 'col-sm-6';
    },
    replaceWhiteSpace: function (a) {
            let string = a.replace(' ','');
            return string;
        },
  },
  components: {
    ProductInfo
  },
  created() {
    this.getBooks();
  },
};
</script>



<style>
img {
  border-radius: 2%;
  margin-bottom: 10px;
}

.fa-check-circle{
  color : green;
}

.fa-times-circle{
  color : red;
}

.fas fa-leaf{
  color : green;
}

.table-hover{
 margin-top: 10px;
}

</style>
