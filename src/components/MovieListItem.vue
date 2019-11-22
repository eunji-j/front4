<template>
    <div class="col-3">
      <img :src=movie.image alt="">
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