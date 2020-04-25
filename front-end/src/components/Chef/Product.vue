<template>
  <div class="divProducto" @click="productClicked">
    <hr>
    <h5 class="card-title">{{indexProduct + 1}}. {{ productJson.Name }} ({{productJson.Servings}})</h5>
    
    <template v-if="showIngredients">
      <span v-for="ingredient in productJson.Ingredients" v-bind:key="ingredient['Name']">
          <Ingredient :ingredientJson="ingredient"> </Ingredient>
      </span>
    </template>


  </div>
</template>

<script>
import Ingredient from './Ingredient.vue'

export default {
  props: {
    productJson: {
      type: Object,
      required: true
    },
    indexProduct: {
        type : Number,
        required: true
    }
    
  },
  data() {
    return {
      showIngredients: false
    };
  },
  methods:{
    productClicked() {
      this.$emit('productClicked', this.indexProduct);
      this.showIngredients = !this.showIngredients;
    }
  },
  components:{
    Ingredient
  },
  created(){
      
  },
  mounted(){
  }
};
</script>

<style scoped>


</style>