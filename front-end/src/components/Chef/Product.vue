<template>
  <div class="divProducto">
    <hr>
    <h5 class="card-title">{{indexProduct}}. {{ productJson.Name }} ({{productJson.Servings}})</h5>

    
      <!-- <img class="img-fluid" v-bind:src="firstPrdImg"> -->
    <span v-for="ingredient in productJson.ingredientes" v-bind:key="ingredient['Name']">
        <Ingredient :ingredientJson="ingredient"> </Ingredient>
    </span>


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
      ordenData: null
    };
  },
  methods:{
    filtrarData() {
    },
    removeSpace(str){
      return str.replace(/\s/g, '');
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