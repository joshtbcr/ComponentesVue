<template>
  <div id="app">
    <Menu @selected="selectedComponent = $event"></Menu>
    <!-- <router-view/> -->
    <transition name="fade" mode="out-in">
      <component :is="selectedComponent">
      </component>
    </transition>

  </div>
</template>

<script>
import Menu from './components/shared/Menu.vue'
import Cajero from './components/Cajero/Cajero.vue'
import Chef from './components/Chef/Chef.vue'
import Home  from './components/Home.vue'

export default {
  name: 'app',
  data(){
    return{
      selectedComponent: ''
    }
  },
  components: {
    Menu,
    Cajero,
    Chef,
    Home
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


.fade-enter{
  opacity: 0;
}

.fade-enter-active{
  transition: opacity 1s;
}

.fade-leave{
  /* opacity: 1; */
}

.fade-leave-active{
  transition: opacity 1s;
  opacity: 0;
}
</style>
