<template>
  <div class="home">
    <h4 class="d-flex text-light mt-5">맞춤추천영화</h4>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Fluid jumbotron</h1>
        <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>

    <h4 class="d-flex text-light mt-5">TOP 10</h4>
    <MovieList :movies="top10" :genres="genres"/>
    <GenreList :genres="genres"/>
  </div>
</template>

<script>
import axios from 'axios'
import MovieList from '../components/MovieList.vue'
import GenreList from '../components/GenreList.vue'
import jwtDecode from 'jwt-decode'
export default {
  name: 'home',
  components: {
    MovieList,
    GenreList,
  },
  data(){
    return {
      userId: '',
      movies: [],
      top10: [],
      genres: [],
      recommended: ''
    }
  },
  mounted() {
    this.$session.start()
    const token = this.$session.get('jwt')
    const decodedToken = jwtDecode(token)
    this.userId = decodedToken.user_id

    const MOVIE_URL = 'http://localhost:8000/api/v1/movies/'
    axios.get(MOVIE_URL)
      .then((res)=>{
        this.movies = res.data
      })
      .catch((e)=>{
        console.log(e)
      }) 
    const TOP10_URL = 'http://localhost:8000/api/v1/movies/top10/'
    axios.get(TOP10_URL)
      .then((res)=>{
        console.log(res)
        this.top10 = res.data
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

    const RECOMMENDED_URL = `http://localhost:8000/api/v1/movies/${this.userId}/`
    axios.get(RECOMMENDED_URL)
      .then((res)=>{
        console.log(res)
          // this.genres = res.data
      })
      .catch((e)=>{
        console.log(e)
      })
    
  }  
}
</script>
