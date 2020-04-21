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
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-dark">
              <td>foo</td>
              <td>foo</td>
              <td>foo</td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-danger btn-sm">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
         <form @submit="formSubmit">
          <button type="button" class="btn btn-success">Generar orden</button>
        </form>
    
      </div>
     
    </div>
    </div>
    <modal-productos/>
  </div>


</template>

<script>
  import ModalProductos from './ModalProductos.vue';
  import axios from 'axios';
   export default {
    methods: {
    show () {
        this.$modal.show('modal-productos');
    },
    formSubmit(e) {
                e.preventDefault();
                let currentObj = this;
                const path = 'http://localhost:5000/generarOrden';
                this.axios.post(path, {
                    name: this.name,
                    description: this.description
                })
                .then(function (response) {
                    currentObj.output = response.data;
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
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


