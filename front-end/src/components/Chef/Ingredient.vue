<template>
<div class="divIngredient">
  <p class="card-text">
    <strong>({{ingredientJson.Amount}} {{ ingredientJson.Unit }})  {{ ingredientJson.Name }}</strong>
  </p>
</div>
</template>

<script>

export default {
  props: {
    ingredientJson: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.divIngredient{
  margin-left: 20px;
}

</style>