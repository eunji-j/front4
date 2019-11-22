<template>
  <div>
    <div class="container card">
      <h1>TOP 10</h1>
      <div class="row">
        <MovieListItem v-for="movie in movies" :key="movie.id" :movie='movie'/>
      </div>
    </div>
  </div>

</template>

<script>
// import axios from 'axios'
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