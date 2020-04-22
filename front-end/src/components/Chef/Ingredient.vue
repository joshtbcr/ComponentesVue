<template>
  <div class="divIngredient">

    
    <p class="card-text">
      <strong>({{ingredientJson.cantidadIngrediente}}) {{ ingredientJson.nombreIngrediente }}</strong>
    </p>
    <!-- <div v-for="(value, key, index) in ingredientJson" v-bind:key="value._id">
      <li>
        {{index}}. {{key}}: {{value}}
      </li>
    </div> -->
  </div>
</template>

<script>

export default {
  props: {
    ingredientJson: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      orderData: null
    };
  },
  methods:{
    filtrarData() {
    }
  }
};
</script>

<style scoped>
.divIngredient{
  margin-left: 20px;
}

</style>