<template>
  <div class="col-3">
    <img :src=movie.image width="100%" alt="이미지가 없습니다.">
    {{movie}}
    <p v-for="hashtag in movie.hashtags" :key="hashtag.id">#{{hashtag}}</p>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      movie: '',
      movieId: ''
    }
  },
  mounted() {
    this.movieId = this.$route.query
    // console.log(this.movieId.id)
    const MOVIE_URL = `http://localhost:8000/api/v1/movies/detail/${this.movieId.id}`
    axios.get(MOVIE_URL)
      .then((res)=>{
        console.log(res)
        this.movie = res.data
      })
      .catch((e)=>{
        console.log(e)
      }) 
  }
}
</script>

<style>

</style>