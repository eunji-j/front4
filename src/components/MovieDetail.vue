<template>
  <div class="row text-white text-left mt-5">
    
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-header">
        <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&#10006;</span>
        </button>
      </div>
      <div class="modal-body">
        <iframe width="100%" height="800" :src="`${movie.video}?autoplay=1`" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>

    <div class="col-5 mt-4">
      <h1 class="display-4">{{movie.title}}</h1>
      <h3 class="d-inline"><span class="badge badge-light mr-2">평균 별점</span></h3><h4 class="d-inline">{{movie.score}}</h4><h5 class="d-inline text-muted ml-3">{{movie.rating}}</h5>
      <hr class="my-4 bg-white">
      <p class="lead">{{movie.description}}</p>
      <h5><span class="lead mr-4">감독</span>{{movie.director}}</h5>
      <h5><span class="lead mr-4">출연</span>{{movie.actor}}</h5>
      <span class="lead mr-4">장르</span>
      <h5 v-for="genre in movie.genres" :key="genre.id" class="lead d-inline">{{genre.name}}|</h5>
      <!-- <p class="lead">{{movie.open_year}}</p>  -->

      <div class="my-5">
        <button class="btn btn-danger btn-lg mr-4" data-toggle="modal" data-target="#exampleModal">▶ 재생</button>
        <h4 class="d-inline" @click="like" v-if="ok" style="color: red;"><i class="fas fa-check" style="color: red;"></i> 보고싶어요</h4>
        <h4 class="d-inline" @click="like" v-else><i class="fas fa-plus"></i> 보고싶어요</h4>
      </div>
      <h5 v-for="(hashtag, index) in movie.hashtags" :key="`hashtag-${index}`" class="d-inline mr-3 text-primary"># {{hashtag.content}}</h5>
      <span v-for="star in stars" :key="`star-${star}`" @click="change(star)"><i class="far fa-star"></i></span>
    </div>

    <div class="col-7">
      <img :src="movie.image" style="width:50%; opacity:0.5;">
    </div>

    <div class="mt-5">
      <h4>비슷한 작품</h4>
      <div class="d-flex">
        <div v-for="(movie2, index) in similarMovie" :key="`movie2-${index}`" class="col-4">
          <div v-if="movie.title !== movie2.title" @click="detail(movie2.id)">
            <img :src=movie2.image width="100%" alt="">
            <p class="text-center">{{movie2.title}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
  data() {
    return {
      movieId: '',
      movie: '',
      similarMovie: [],
      isAthenticated: this.$session.has('jwt'),
      userId: '',
      ok: '',
      stars: 5,
    }
  },
  methods: {
    like(){
      if (this.checkLoggedIn()){
          // console.log(this.movie)
          this.$session.start()
          const token = this.$session.get('jwt')

          const requestHeader = {
            headers: {
              Authorization: 'JWT ' + token
            }
          }

          axios.get(`http://localhost:8000/api/v1/movies/${this.movieId.id}/like/`, requestHeader)
            .then((res)=>{
              // console.log(res)
              this.ok = res.is_ok
              // 현재페이지 새로고침
              location.reload()
            })
            .catch((e)=>{
              console.log(e)
            })
        
      }
    },
    checkLoggedIn(){
      if (!this.isAthenticated){
        alert('로그인 후 이용해주세요.')
        this.$router.push('/login')
      }else {
        return true
      }
    },
    detail(id){
      this.$router.push(`/detail?id=${id}`)
    }
  },
  mounted() {
    this.movieId = this.$route.query

    if (this.movieId.id !== undefined){
      if (this.isAthenticated){
        this.$session.start()
        const token = this.$session.get('jwt')
        const decodedToken = jwtDecode(token)
        this.userId = decodedToken.user_id
      }

      const MOVIE_URL = `http://localhost:8000/api/v1/movies/detail/${this.movieId.id}/`
      axios.get(MOVIE_URL)
        .then((res)=>{
          this.movie = res.data
        })
        .catch((e)=>{
          console.log(e)
        })
        
      axios.get(`http://localhost:8000/api/v1/movies/hashtags/${this.movieId.id}/`)
        .then((res)=>{
          this.similarMovie = res.data
        })
        .catch((e)=>{
          console.log(e)
        })
    }
  },
  updated(){
    // 영화의 users에 로그인한 유저가 있는경우 ok는 true
    if (this.movieId.id !== undefined && this.movie.users !== undefined){
      // console.log(this.movie.users.length)
      for (let i=0; i<this.movie.users.length; i++){
        if (this.movie.users[i] == this.userId){
          this.ok = true
        }
      }
    }
    this.isAthenticated = this.$session.has('jwt')
  },
}
</script>

<style>
</style>