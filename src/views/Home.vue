<template>
  <div class="home">
    <h4 class="d-flex text-light mt-5">TOP 10</h4>
    <MovieList :movies="movies" :genres="genres"/>
    <GenreList :genres="genres"/>
  </div>
</template>

<script>
import axios from 'axios'
import MovieList from '../components/MovieList.vue'
import GenreList from '../components/GenreList.vue'
export default {
  name: 'home',
  components: {
    MovieList,
    GenreList,
  },
  data(){
    return {
      movies: [],
      genres: []
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
    const GENRE_URL = 'http://localhost:8000/api/v1/movies/genres/'
    axios.get(GENRE_URL)
      .then((res)=>{
          this.genres = res.data
      })
      .catch((e)=>{
          console.log(e)
      })
  }  
}
</script>
