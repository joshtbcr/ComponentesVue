<template>
    <div name="empty-order" class="container">   
    <div class="row">
    <div class="col-sm-12">
        <div id="emptycard" class="card text-white bg-danger mb-3" display="center" style="max-width: 40rem;">
        <div class="card-body">
            <p class="card-text">{{ msgOrderContent }}</p>
        </div>
        </div>
    </div>
    </div>
    </div>
</template>


<script>
export default {
  props: {
    msgOrderContent : String,
  },
};
</script>

<style>
#emptycard {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
}

</style>
