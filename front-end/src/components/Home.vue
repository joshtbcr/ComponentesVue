<template>
  <div>
    <p @click="cargar">{{ msg }}</p>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'Home',
  data() {
    return {
      msg: 'Hello!',
    };
  },
  methods:{
    cargar() {
      const path = 'http://localhost:5000/ordenes/all';
      axios.get(path)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    }
  }
};
</script>