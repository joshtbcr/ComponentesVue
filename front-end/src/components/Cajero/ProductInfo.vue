<template>
    <div name="product-info" class="col-sm-6">
        <div id="info" class="jumbotron">
             <h5>Product information</h5>
             <span class="badge badge-primary">{{ product.Name }}</span>
             <hr class="my-4">
             <img style="height: 300px; width: 100%; display: block;" :src="sourceimg" alt="Card image">

              <div class="listaPropiedades">
                  <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Vegan 
                    <span v-if="product.Vegan" class="badge badge-pill badge-success">Vegan!</span>
                    <span v-else class="badge badge-pill badge-danger">No vegan</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Vegetarian
                    <span v-if="product.Vegetarian" class="badge badge-pill badge-success">Vegetarian!</span>
                    <span v-else class="badge badge-pill badge-danger">No vegetarian</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Gluten Free
                   <span v-if="product.GlutenFree" class="badge badge-pill badge-success">Gluten free!</span>
                   <span v-else class="badge badge-pill badge-danger">No gluten free</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Dairy Free  
                   <span v-if="product.DairyFree" class="badge badge-pill badge-success">Dairy free!</span>
                   <span v-else class="badge badge-pill badge-danger">No dairy free</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Cheap
                   <span v-if="product.Cheap" class="badge badge-pill badge-success">Very cheap!</span>
                   <span v-else class="badge badge-pill badge-danger">Expensive</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Popular 
                   <span v-if="product.VeryPopular" class="badge badge-pill badge-success">Very popular!</span>
                   <span v-else class="badge badge-pill badge-danger">So weird</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Healthy
                   <span v-if="product.VeryHealthy" class="badge badge-pill badge-success">So healthy!</span>
                   <span v-else class="badge badge-pill badge-danger">No healthy</span>
                  </li>
                </ul>
              </div>


              <div class="listaIngredientes">
                  <table class="table table-hover">
                    <thead>
                      <tr class="table-primary">
                          <th scope="col">Code</th>
                          <th scope="col">Ingredient</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Unit</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ingredient, index) in product.Ingredients" :key="index">
                        <td>{{ ingredient.Name }}</td>
                        <td>{{ (ingredient.Amount).toFixed(2) }}</td>
                        <td>{{ ingredient.Unit }}</td>
                        </td>
                      </tr>
                    </tbody>
                  </table>
              </div>

        </div>
     </div>
</template>


<script>

export default {
  props: {
      product: Object,
      sourceimg: String,
  },
  data() {
    return {
    };
  },
  methods: {
    getBooks() {
      console.log('product info ' +this.product);
    },
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
