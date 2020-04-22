<template>
  <div class="container">
    <div class="form-group">
      <div class="row">
        <div class="col-sm-3"><label class="col-form-label" for="inputDefault">Digite el ingrediente a buscar:</label></div>
        <div class="col-sm-6"><input type="text" class="form-control" placeholder="Ingrese un ingrediente/producto..." id="inputDefault"></div>
        <div class="col-sm-3"><button type="button" id="show-modal" @click="show" class="btn btn-success">Buscar</button></div>
      </div>
    </div>
  <div class="jumbotron">
    <div class="row">
      <div class="col-sm-12">
        <h5 class="display-5">Orden</h5>
        <hr class="my-4">
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th scope="col">Código de producto</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
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
          <button type="button" @click="generarOrden" class="btn btn-success">Generar orden</button>
        </form>
    
      </div>
     
    </div>
    </div>
    <modal-productos :method="mostrarProductosSeleccionados"/>
  </div>


</template>

<script>
  import ModalProductos from './ModalProductos.vue';
  import axios from 'axios';

   export default {
      data: () => ({
      productsOrder: [],
    }),
    methods: {
      show () {
          this.$modal.show('modal-productos');
      },
      mostrarProductosSeleccionados(producto){
        this.productsOrder.push(producto);
        console.log('todos los productos: ', JSON.stringify(this.productsOrder));
      },
      generarOrden() {
                const path = 'http://localhost:5000/generarOrden';
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


