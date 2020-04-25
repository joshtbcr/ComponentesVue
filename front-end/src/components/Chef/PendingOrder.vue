<template>
  <div class="divOrder" v-if="showOrder">
    <div class="card-img-top">
      
      <img class="img-fluid" v-bind:src="prdImg">

    </div>
    <div class="card-body">
      <p class="card-text">
        <strong>Status: </strong>{{ orderJson.OrderStatus }}
      </p>
      <p class="card-text">
        <strong>Total Price: </strong>{{ orderJson.TotalPrice }}
      </p>
      <p class="card-text">
        <strong># Order: </strong>{{ orderJson.OrderId }}
      </p>
      <p>
        <strong>Date: </strong>{{ orderJson.Date }}
      </p>

      <div>
        <!-- <h5 class="card-title">Productos</h5> -->
        <div v-for="(product, index) in orderJson.Products" v-bind:key="index">
          <Product :productJson="product" :indexProduct="index"
            @productClicked="productClicked($event)"
          >
            
          </Product>
          <!-- {{index === 0 ? updateImg(arrImg[0]): ""}} -->
        </div>
      </div>
      
      <div class="card-footer">
        <button class="btn btn-danger" @click="cookOrder"> Cook Order </button>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
import Product from './Product.vue';

export default {
  props: {
    orderJson: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      orderData: null,
      showOrder: true,
      prdImg: origin + '/SelectProduct.png',
      arrImg: []
    };
  },
  computed:{
  },
  methods:{
    changeStatus(orderId){
      //Code to change status on backend

      return true;
    },
    cookOrder(){
      this.changeStatus(this.orderJson.OrderId) ? this.showOrder = false: true;
    },
    productClicked(index){
      console.log("Change[Order #"+this.orderJson.OrderId+"]"+"Cambiando img a:" + this.arrImg[index]);
      this.prdImg = this.arrImg[index];
    }
  },
  created() {

    //Poner imagenes de producto en Array para carousel
    var imgs = [];
    this.$props.orderJson.Products.forEach(function(item, index, array){
          imgs.push(item.Image.replace(/\s/g, ''));
    });
    this.arrImg = imgs;
  },
  components: {
    Product
  }
};
</script>



<style scoped>

.card-img-top {
min-width: 100%;
max-width: 150px;
/* height: auto; */
}


.divOrder{
  text-align: left;
}

  
</style>