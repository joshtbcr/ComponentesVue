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
                  <button type="button" class="btn btn-danger btn-sm">Delete</button>
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
    <modal-productos v-if='show' :method="mostrarProductosSeleccionados" :showProducts="showProducts"/>
  </div>


</template>

<script>
  import ModalProductos from './ModalProductos.vue';
  import axios from 'axios';
  import {eventBus} from '../../main';

   export default {
      data: () => ({
      productsOrder: [],
      productValue: null,
      showProducts: false,
      sucess: false
    }),
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
        const pathSpoon = eventBus.backendUrl + '/buscar?busquedaId=' + guidValue;
        console.log('Path con guid: ' +pathSpoon);
        do {
            axios.get(pathSpoon)
              .then((res) => {
                console.log('Entra al ciclo.');
                if(res.status == 200){
                    if(res.data == "False" || res.data == false){
                      console.log('Se obtiene un code status response: ' +res.status+ ' con un False.');
                      console.log('Se obtiene data response: ' +res.data);
                      console.log(res.status);
                      this.success = false;
                    } else {
                      console.log('Se obtiene un code status response: ' +res.status);
                      console.log('Se obtiene data response: ' +res.data);
                      this.success = true;
                    }
                } else if (res.status == 500) {
                  console.log('Se obtiene un code status response: ' +res.status);
                  this.success = true;
                } else if (res.status == 404) {
                   console.log('Se obtiene un code status response: ' +res.status);
                  this.success = true;
                } else {
                  this.success = false;
                }
              })
              .catch((error) => {
                console.error(error);
              });
        } while(!this.success)
      },
      mostrarProductosSeleccionados(producto){
        this.productsOrder.push(producto);
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
           return randomNumber;
        },
        generarFechaHoy(){

        }
      },
  components: {
    'ModalProductos': ModalProductos
  }
}

</script>

<style>
    .container {
    margin-top: 25px;
    }

</style>


