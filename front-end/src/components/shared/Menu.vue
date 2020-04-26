<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#">Monjosh</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      
      <li id="navCajero" @click="changeSelected('Cajero')" :class="['nav-item', {active : selected === 'Cajero'}]">
        <a class="nav-link" href="#">Cashier</a>
      </li>
      <li id="navChef" @click="changeSelected('Chef')" :class="['nav-item', {active : selected === 'Chef'}]">
        <a class="nav-link" href="#">Chef</a>
      </li>
    </ul>
    <!-- <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" placeholder="Search">
      <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
    </form> -->
  </div>
</nav>
</template>

<script>
export default {
  name: 'Menu',
  props:{

  },
  data(){
    return{
      selected: 'Cajero'
    }
  },
  methods: {
    changeSelected(vista){
      this.selected = vista;
      this.$emit('selected', this.selected);
    }
  }
}

</script>