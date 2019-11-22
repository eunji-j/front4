<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MovieList :movies="movies"/>
  </div>
</template>

<script>
import axios from 'axios'
import MovieList from '../components/MovieList.vue'
export default {
  name: 'home',
  components: {
    MovieList
  },
  data(){
    return {
      movies: [],
      genres : []
    }
  },
  mounted() {
    const MOVIE_URL = 'http://localhost:8000/api/v1/movies/'
    axios.get(MOVIE_URL)
      .then((res)=>{
        this.movies = res.data
      })
      .catch((e)=>{
        console.log(e)
      })
  }
}
</script>
