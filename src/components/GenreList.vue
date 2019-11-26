<template>
  <div>
    <div>
      <p v-for="genre in genres" :key="genre.id" @click="setGenre(genre.id)" class="btn btn-outline-primary rounded-pill m-1">{{genre.name}}</p>
    </div>
    <h4 class="d-flex text-light">장르별 차트</h4>
    <MovieList :movies="movies"/>
  </div>
</template>

<script>
// import Genre from './Genre.vue'
import MovieList from './MovieList.vue'
import axios from 'axios'
export default {
    name: 'genrelist',
    data(){
      return {
        genreId: 1,
        movies:[]
      }
    },
    methods: {
      setGenre(id){
        this.genreId = id
      },
      getMovies(){
        axios.get(`http://localhost:8000/api/v1/movies/genre/${this.genreId}/`)
          .then((res)=>{
            this.movies = res.data
          })
          .catch((e)=>{
            console.log(e)
          })
      }
    },
    components: {
      MovieList
    },
    props: [
      'genres'
    ],
    watch:{
      genreId:{
        handler(){
          this.getMovies()
        }
      }
    },
    mounted(){
      this.getMovies()
    }
    
}
</script>

<style>

</style>