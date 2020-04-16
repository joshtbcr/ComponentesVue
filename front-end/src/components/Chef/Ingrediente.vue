<template>
  <div>
    <li v-for="dato in ordenData" v-bind:key="dato">
        {{ dato }}

    </li>
    <!-- <div> {{filtrarData() }} </div> -->

  </div>
</template>

<script>

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
    },
    changeStatus(){

    }
  },
  mounted() {
    this.ordenData = this.ordenJson;
    delete this.ordenData._id;
    delete this.ordenData._id;
    delete this.ordenData._id;
    
    return this.ordenData;
  }
};
</script>