<template>
  <div>
    <li v-for="dato in ordenJson" v-bind:key="dato._id">{{ dato }}</li>
    <!-- <div> {{filtrarData() }} </div> -->

  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    ordenJson: {
      type: Object,
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
      this.ordenData = this.ordenJson;

      return this.ordenData;
    },
    changeStatus(){

    }
  }
};
</script>