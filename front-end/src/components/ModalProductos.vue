<template>
<div>
<modal name="modal-productos" ref="modal" :adaptive="true" :scrollable="true" width="80%" height="auto">
<div class="container">
    <div class="row">

      <div class="col-sm-6">
        <h5>Lista de productos</h5>
          <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
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
                 <button 
                        type="button" 
                        id="show-info" 
                        v-on:click="isHidden = true" 
                        class="btn btn-info">
                        Ver info
                        </button>
                 <button 
                        type="button" 
                        class="btn btn-success"
                        @click="agregarOrden(product)">
                        Agregar a orden
                 </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    <div class="col-sm-6">
             <div id="info" v-show="isHidden" class="jumbotron">
             <h5>Información del producto</h5>
             <span class="badge badge-primary">{{ ProductName }}</span>
              <hr class="my-4">
              
              <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Vegano: {{ ProductVegan }}
                <i class="fas fa-check-circle"></i>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Vegetariano: {{ ProductVegetarian }}
                <i class="fas fa-check-circle"></i>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Gluten Free: {{ ProductGluten }}
                <i class="fas fa-check-circle"></i>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Lactosa Free: {{ ProductDairy }}
                <i class="fas fa-check-circle"></i>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Económico: {{ ProductCheap }}
                <i class="fas fa-check-circle"></i>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Popular: {{ ProductPopular }}
                <i class="fas fa-check-circle"></i>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Saludable: {{ ProductHealthy }}
                <i class="fas fa-check-circle"></i>
              </li>
            </ul>

            </div>
    </div>
    </div>
  </div>

</modal>
</div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      isHidden: false,
      ProductName: '',
      ProductVegan: '',
      ProductVegetarian: '',
      ProductGluten: '',
      ProductDairy: '',
      ProductCheap: '',
      ProductPopular: '',
      ProductHealthy: '',
      ingredients: [],
      order_products: [],
    };
  },
  methods: {
    getProducts() {
      const path = 'http://localhost:5000/books';
      axios.get(path)
        .then((res) => {
          console.log(res.data);
          this.products = res.data.products;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    clickList(product){
         this.ProductName = product.Name;
         this.ProductVegan = product.Vegan;
         this.ProductVegetarian = product.Vegetarian;
         this.ProductGluten = product.GlutenFree;
         this.ProductDairy = product.DairyFree;
         this.ProductCheap = product.Cheap;
         this.ProductPopular = product.VeryPopular;
         this.ProductHealthy = product.VeryHealthy;
    },
    agregarOrden(product){
        console.log('agregar Orden de ' +product.Name);
        order_product = product;
    }
  },
  created() {
    this.getProducts();
  },
};
</script>



<style>

</style>

