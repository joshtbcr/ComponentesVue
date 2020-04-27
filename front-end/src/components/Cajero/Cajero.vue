<template>
  <div class="container">
    <div class="form-group">
      <div class="row">
        <div class="col-sm-3"><label class="col-form-label" for="inputDefault">Insert product search:</label></div>
        <div class="col-sm-6"><input type="text" v-model="productValue" class="form-control" id="productValue" placeholder="Insert a product/ingredient..."></div>
        <div class="col-sm-3"><button type="button" id="show-modal" @click="pruebaProductos()" class="btn btn-success">Search</button></div>
      </div>
    </div>
   <div class="jumbotron">

    <div class="row">
      <div class="col-sm-12">
        <h5 class="display-5">Order</h5>
        <hr class="my-4">
        <empty-order v-if="products.length==0"/>
        <div id="OrderContent" v-if="products.length>0">
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
                  <input type="text" readonly="" class="form-control-plaintext" id="staticPrice" :value="totalPrice">
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
                  <td>{{ productOrder.PricePerServing*productOrder.Servings }}</td>
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
      totalPrice: 0,
      currentDate: '',
      orderNumber: 0,
    }),
    methods: {
      pruebaProductos(){
        this.$modal.show('modal-productos');
        this.showProducts = true;
        const path = 'http://localhost:5000/books';
          axios.get(path)
            .then((res) => {
              this.products = res.data.products;
              console.log(this.products);
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.error(error);
            });
      },
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
          //this.showProducts = true;
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
                      productos = xhr.responseText;
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
        this.calcularPrecioTotal();
        console.log('todos los productos: ', JSON.stringify(this.productsOrder));
      },
      generarOrden() {
                const path =  eventBus.backendUrl + '/generarOrden';
                axios.post(path, {
                    OrderId: this.generarNumeroRandom(),
                    OrderStatus: 'Pending',
                    TotalPrice: 1000,
                    Products: this.productsOrder
                }).then(response => {
                // Respuesta del servidor
                }).catch(e => {
                    console.log(e);
                });
        },
        generarNumeroRandom(){
           let randomNumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
           this.orderNumber = randomNumber;
           return randomNumber;
        },
        generarFechaHoy(){
  
            var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            this.currentDate = currentDateWithFormat;
            console.log(currentDateWithFormat);
        },
        calcularPrecioTotal(){
          this.totalPrice = this.products.reduce((acumulador, valorActual) => acumulador = PricePerServing*Servings);
        },
        borrarProducto(index){
            this.productsOrder.splice(index, 1);
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


