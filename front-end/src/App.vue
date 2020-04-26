<template>
  <div id="app">
    <Menu @selected="selectedComponent = $event"></Menu>
    <!-- <router-view/> -->
    <component :is="selectedComponent">

    </component>
  </div>
</template>

<script>
import Menu from './components/shared/Menu.vue'
import Cajero from './components/Cajero/Cajero.vue'
import Chef from './components/Chef/Chef.vue'

export default {
  name: 'app',
  data(){
    return{
      selectedComponent: 'Cajero'
    }
  },
  components: {
    Menu,
    Cajero,
    Chef
  }
}

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
