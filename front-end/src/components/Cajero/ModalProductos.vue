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
             <img style="height: 300px; width: 100%; display: block;" :src="source" alt="Card image">

              <div class="listaPropiedades">
                  <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Vegano:  {{ ProductVegan }}
                    <i v-if="ProductVegan" class="fas fa-leaf"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Vegetariano: {{ ProductVegetarian }}
                    <i v-if="ProductVegetarian" class="fas fa-leaf"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Gluten Free:  {{ ProductGluten }}
                    <i v-if="ProductGluten" class="fas fa-check-circle"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Lactosa Free: {{ ProductDairy }}
                    <i v-if="ProductDairy" class="fas fa-check-circle"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Económico:  {{ ProductCheap }}
                    <i v-if="ProductCheap" class="fas fa-check-circle"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Popular: {{ ProductPopular }}
                    <i v-if="ProductPopular" class="fas fa-check-circle"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Saludable:  {{ ProductHealthy }}
                    <i v-if="ProductHealthy" class="fas fa-check-circle"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                </ul>
              </div>

              <div class="listaIngredientes">
                  <table class="table table-hover">
                    <thead>
                      <tr class="table-primary">
                          <th scope="col">Id</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Cantidad</th>
                          <th scope="col">Unidad</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ingredient, index) in ingredients" :key="ingredient.Id">
                        <td>{{ ingredient.Id }}</td>
                        <td>{{ ingredient.Name }}</td>
                        <td>{{ ingredient.Amount }}</td>
                        <td>{{ ingredient.Unit }}</td>
                        </td>
                      </tr>
                    </tbody>
                  </table>
              </div>
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
  props: {
    method: { type: Function },
  },
  data() {
    return {
      products: [],
      isHidden: false,
      ProductName: '',
      ProductVegan: false,
      ProductVegetarian: false,
      ProductGluten: false,
      ProductDairy: false,
      ProductCheap: true,
      ProductPopular: false,
      ProductHealthy: false,
      ingredients: [],
      source: "https://images.app.goo.gl/4m1LJ6FzgDdDV1wAA",
      orderProducts: [],
      ingredients: [],
    };
  },
  methods: {
    getProducts() {
      const path = 'http://localhost:5000/products';
      axios.get(path)
        .then((res) => {
          console.log(res.data);
          this.products = res.data.Products;
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
         this.source = this.replaceWhiteSpace(product.Image);
         this.ingredients = product.Ingredients;
    },
    agregarOrden(product){
        console.log('agregar Orden de ' +product.Name);
        //this.orderProducts.push(product);
        this.method(product);
  
    },
    replaceWhiteSpace: function (a) {
            let string = a.replace(' ','');
            return string;
        },
  },
  created() {
    this.getProducts();
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

