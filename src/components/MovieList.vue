<template>
  <div>
    <div>
      <h4 class="d-flex">TOP 10</h4>
      <div class="row">
        <MovieListItem v-for="movie in movies" :key="movie.id" :movie='movie'/>
      </div>
    </div>
  </div>

</template>

<script>
import MovieListItem from './MovieListItem.vue'

export default {
  props: [
    'movies'
  ],
  components: {
    MovieListItem
  }
}
</script>

<style>

</style>