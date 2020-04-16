<template>
  <div class="container">
    <div class="form-group">
      <div class="row">
        <div class="col-sm-3"><label class="col-form-label" for="inputDefault">Digite el ingrediente a buscar:</label></div>
        <div class="col-sm-6"><input type="text" class="form-control" placeholder="Ingrese un ingrediente/producto..." id="inputDefault"></div>
        <div class="col-sm-3"><button type="button" id="show-modal" @click="show" class="btn btn-success">Buscar</button></div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <h5>Orden</h5>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>foo</td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-danger btn-sm">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <modal-productos/>
  </div>


</template>

<script>
  import ModalProductos from './ModalProductos.vue'
   export default {
    methods: {
    show () {
        this.$modal.show('modal-productos');
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


