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
                  Vegan:  
                    <i v-if="product.Vegan" class="fas fa-leaf"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Vegetarian:
                    <i v-if="product.Vegetarian" class="fas fa-leaf"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Gluten Free:
                    <i v-if="product.GlutenFree" class="fas fa-check-circle"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Dairy Free:
                    <i v-if="product.DairyFree" class="fas fa-check-circle"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Cheap:
                    <i v-if="product.Cheap" class="fas fa-check-circle"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Popular:
                    <i v-if="product.VeryPopular" class="fas fa-check-circle"></i>
                    <i v-else class="fas fa-times-circle"></i>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                  Saludable:
                    <i v-if="product.VeryHealthy" class="fas fa-check-circle"></i>
                    <i v-else class="fas fa-times-circle"></i>
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
                      <tr v-for="(ingredient, index) in product.Ingredients" :key="ingredient.Id">
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
