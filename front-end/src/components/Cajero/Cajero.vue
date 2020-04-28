<template>
  <div class="container">
    <div class="form-group">
      <div class="row">
        <div class="col-sm-3"><label class="col-form-label" for="inputDefault">Insert product search:</label></div>
        <div class="col-sm-6"><input type="text" v-model="productValue" class="form-control" id="productValue" placeholder="Insert a product/ingredient..."></div>
        <div class="col-sm-3"><button type="button" id="show-modal" @click="show(productValue)" class="btn btn-success">Search</button></div>
      </div>
    </div>
   <div class="jumbotron">

    <div class="row">
      <div class="col-sm-12">
        <h5 class="display-5">Order</h5>
        <hr class="my-4">
        <empty-order v-if="!showOrderContent" :msgOrderContent="msgOrderContent"/>
        <div id="OrderContent" v-if="showOrderContent">
            <div class="form-group row">
                <label for="staticDate" class="col-sm-2 col-form-label">Date:</label>
                <div class="col-sm-10">
                  <input type="text" readonly="" class="form-control-plaintext" id="staticDate" :value="currentDate">
                </div>
                <label for="staticOrder" class="col-sm-2 col-form-label"># Order:</label>
                <div class="col-sm-10">
                  <input type="text" readonly="" class="form-control-plaintext" id="staticOrder" :value="orderNumber">
                </div>
                <label for="staticPrice" class="col-sm-2 col-form-label">Total price:</label>
                <div class="col-sm-10">
                  <input type="text" readonly="" class="form-control-plaintext" id="staticPrice" :value="'$' +sumTotalPrice">
                </div>
            </div>
            <table class="table table-hover">
              <thead>
                <tr class="table-primary">
                  <th scope="col">Product Code</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="table-dark">
              <tr v-for="(productOrder, index) in productsOrder" :key="index">
                  <td>{{ productOrder.Id }}</td>
                  <td>{{ productOrder.Name }}</td>
                  <td>{{ '$' +((productOrder.PricePerServing*productOrder.Servings*4)/550).toFixed(2) }}</td>
                  <td>
                    <div class="btn-group" role="group">
                      <button type="button" @click="borrarProducto(index)" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <form>
              <button type="button" @click="generarOrden" class="btn btn-success">Submit order</button>
            </form>
        </div> 

      </div> 
    </div>
   </div>
    <div class="jumbotron" id="readyOrders">
     <h5 class="display-5">Ready order</h5>
     <hr class="my-4">
      <ready-order></ready-order>
    </div>
    <modal-productos v-if='show' :method="mostrarProductosSeleccionados" :showProducts="showProducts"  :products="products"/>
  </div>


</template>

<script>
  import ModalProductos from './ModalProductos.vue';
  import axios from 'axios';
  import {eventBus} from '../../main';
  import ReadyOrder from './ReadyOrder.vue';
  import EmptyOrder from './EmptyOrder.vue';

   export default {
      data: () => ({
      productsOrder: [],
      productValue: null,
      showProducts: false,
      sucess: false,
      products: [],
      currentDate: '',
      orderNumber: 0,
      showOrderContent: false,
      msgOrderContent: 'Please insert products to generate an order.',
    }),
    computed: {
      sumTotalPrice() {
            if (this.productsOrder.length == 0) {
                return 0;
            } else {
               var sum = 0;
                    this.productsOrder.forEach(e => {
                        sum += (e.PricePerServing*e.Servings*4)/550;
                    });
                    return sum.toFixed(2)
            }
      }
    },
    methods: {
      show(productValue) {
        let guid = '';
        if (this.productValue != null){
          this.$modal.show('modal-productos');
          console.log('Entra al modal con: ' + this.productValue);
          const path = eventBus.backendUrl + '/buscar?query=' + this.productValue;
          console.log('Path con query: ' +path);
          axios.get(path)
         .then((res) => {
          console.log('GUID obtenido: ' +res.data);
          guid = res.data;
          this.getProductsSpoonacular(guid);
        })
        .catch((error) => {
          console.error(error);
        });
        } else {
          this.$alert("Please insert some value.");
        }
      },
      getProductsSpoonacular(guidValue) {
          console.log('Iniciando ciclo de requests con guid: '+ guidValue);
          var requestsCounter = 0;
          var intervalo = setInterval(function () {
                  requestsCounter < 5 ? requestsCounter++ : clearInterval(intervalo);
                  console.log('Request #'+requestsCounter);
                  var xhr = new XMLHttpRequest();
                  xhr.open('GET',eventBus.backendUrl + '/buscar?busquedaId=' + guidValue);
                  xhr.onload = () => {
                    if (xhr.status === 200 && xhr.responseText!== 'False'){
                      console.log(xhr.responseText); 
                      var responsexml = JSON.parse(xhr.responseText);
                      this.products = responsexml.products;
                      console.log('productos obtenidos: ', JSON.stringify(this.products)); 
                      clearInterval(intervalo);
                      this.showProducts = true;
                      
                    }else{
                      console.log('Respuesta del backend no valida:'+ "\n\t"+ xhr.status  + xhr.responseText); 
                    }
                  }
                  xhr.send();
                }, 5000);
      },
      mostrarProductosSeleccionados(producto){
        this.productsOrder.push(producto);
        this.showOrderContent= true;
        this.calcularPrecioTotal();
        console.log('todos los productos: ', JSON.stringify(this.productsOrder));
      },
      generarOrden() {
                const path =  eventBus.backendUrl + '/generarOrden';
                axios.post(path, {
                    OrderId: this.orderNumber,
                    OrderStatus: 'Pending',
                    TotalPrice: this.sumTotalPrice,
                    Products: this.productsOrder
                }).then(response => {
                     this.$alert("Order successfully registered!");
                     this.productsOrder = [];
                     this.showOrderContent= false;
                }).catch(e => {
                    console.log(e);
                });
        },
        generarNumeroRandom(){
           let randomNumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
           this.orderNumber = randomNumber;
           return randomNumber;
        },
        generarFechaHoy(){
            var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            this.currentDate = currentDateWithFormat;
        },
        calcularPrecioTotal(){
             this.totalPrice = productsOrder.reduce((a, product) => +a + +product.PricePerServing, 0);
        },
        borrarProducto(index){
            this.productsOrder.splice(index, 1);
            if(this.productsOrder.length==0){
              this.showOrderContent= false;
            }
        },
      },
  components: {
    ModalProductos,
    ReadyOrder,
    EmptyOrder,
  },
  created() {
      this.generarNumeroRandom();
      this.generarFechaHoy();
  },
}

</script>

<style>
    .container {
    margin-top: 25px;
    }

    .jumbotron {
    margin-top: 25px;
    }

</style>


