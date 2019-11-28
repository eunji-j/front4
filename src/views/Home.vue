<template>
  <div class="home">
    <div v-if="recommended" class="card bg-dark text-white" style="border:0;" @click="detail">
      <img :src="image" class="card-img" style="object-fit:cover;height:600px;opacity:0.4;">
      <div class="ml-2 card-img-overlay text-light align-items-center">
        <p class="d-flex" style="font-size:4rem; margin-top:200px;font-weight:1000;">맞춤 추천 영화</p>
        <h2 class="mt-4 d-flex">{{recommended.title}}</h2>
        <div class="mt-5 d-flex">
          <h3 class="mr-2">당신의 취향은 </h3>
          <h3 class="text-warning mr-2" v-for="(hashtag, index) in recommended.hashtags" :key="`hashtag-${index}`"> #{{hashtag.content}}</h3>
        </div>
      </div>
    </div>
    <div v-else class="jumbotron jumbotron-fluid">
      <div class="container">
        <p class="lead">서비스를 이용하려면 로그인이 필요해요</p>
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
      token: '',
      userId: '',
      movies: [],
      top10: [],
      genres: [],
      recommended: '',
      image: ''
    }
  },
  methods:{
    detail(){
      this.$router.push(`/detail?id=${this.recommended.id}`)
    }
  },
  mounted() {
    if (this.$session.has('jwt')){
      this.$session.start()
      this.token = this.$session.get('jwt')
      const decodedToken = jwtDecode(this.token)
      this.userId = decodedToken.user_id
    }
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
        // console.log(res)
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

    const requestHeader = {
        headers: {
        Authorization: 'JWT ' + this.token
        }
    }
    const RECOMMENDED_URL = `http://localhost:8000/api/v1/movies/${this.userId}/`
    axios.get(RECOMMENDED_URL, requestHeader)
      .then((res)=>{
        this.recommended = res.data
        this.image = this.recommended.image
      })
      .catch((e)=>{
        console.log(e)
      })
    
  }  
}
</script>

<style>
</style>