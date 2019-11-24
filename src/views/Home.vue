<template>
  <div class="home">
    <MovieList :movies="movies" :genres="genres"/>
    <Genre />
  </div>
</template>

<script>
import axios from 'axios'
import MovieList from '../components/MovieList.vue'
import Genre from '../components/Genre.vue'
export default {
  name: 'home',
  components: {
    MovieList,
    Genre
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
