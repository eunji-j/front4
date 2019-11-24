<template>
    <div class="col-2 text-center">
      <img :src=movie.image width="100%">
      <p>{{movie.title}}</p>
    </div>
</template>

<script>

export default {
  props: [
    'movie'
  ]
}
</script>

<style>

</style>