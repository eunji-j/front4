<template>
  <div class="row text-white text-left">
    <div class="col-5 mt-4">
      <h1 class="display-4">{{movie.title}}</h1>
      <p class="lead">{{movie.title_en}}</p>
      <h3 class="d-inline"><span class="badge badge-light mr-2">평균 별점</span></h3><h4 class="d-inline">{{movie.score}}</h4><h5 class="d-inline text-muted ml-3">{{movie.rating}}</h5>
      <hr class="my-4 bg-white">
      <!-- <p class="lead">{{movie.description}}</p> -->
      <h5><span class="lead mr-4">감독</span>{{movie.director}}</h5>
      <h5><span class="lead mr-4">출연</span>{{movie.actor}}</h5>
      <span class="lead mr-4">장르</span>
      <h5 v-for="genre in movie.genres" :key="genre.id" class="lead d-inline">{{genre.name}}|</h5>
      <!-- <p class="lead">개봉일 | {{movie.date|date:'Y-m-d'}}</p>  -->

      <div class="my-4">
        <!-- <button class="btn btn-secondary btn-lg mr-2">목록</button>
        <button class="btn btn-primary btn-lg mr-2">수정</button> -->
        <button class="btn btn-danger btn-lg mr-4">재생</button>
        <h4 class="d-inline" @click="like" v-if="ok" style="color: red;"><i class="fas fa-check" style="color: red;"></i> 보고싶어요</h4>
        <h4 class="d-inline" @click="like" v-else><i class="fas fa-plus"></i> 보고싶어요</h4>
      </div>
      <p v-for="(hashtag, index) in movie.hashtags" :key="`hashtag-${index}`" class="d-inline mr-3 text-primary"># {{hashtag.content}}</p>
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
      ok: ''
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
          .then(()=>{
            this.$router.push('/login')
          })
      }else {
        return true
      }
    },
    detail(id){
      this.$router.push(`/detail?id=${id}`)
    }
    // checkLike(){
    //   this.$session.start()
    //   const token = this.$session.get('jwt')
    //   const userId = this.token.user_id

    //   const requestHeader = {
    //     headers: {
    //       Authorization: 'JWT ' + token
    //     }
    //   }
    //   const form = new FormData()
    //   form.append('userId', userId)

    //   axios.post(`http://localhost:8000/api/v1/movies/${this.movieId.id}/like/`,form, requestHeader)
    //     .then((res)=>{
    //       console.log(res)
    //       this.ok = res.is_ok
    //     })
    //     .catch((e)=>{
    //       console.log(e)
    //     })
      
    // }
  },
  mounted() {
    this.$session.start()
    const token = this.$session.get('jwt')
    const decodedToken = jwtDecode(token)
    this.userId = decodedToken.user_id

    this.movieId = this.$route.query
    // console.log(this.movieId.id)
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
  },
  updated(){
    if (this.movie){
      console.log(this.movie.like_users.length)
      for (let i=0; i<this.movie.like_users.length; i++){
        if (this.movie.like_users[i] == this.userId){
          this.ok = true
        }
      }
    }
    this.isAthenticated = this.$session.has('jwt')
  },
  // computed: {
  //   ok: function(){
  //     for (let i=0; i<this.movie.like_users.length; i++){
  //       if (this.movie.like_users[i] == this.userId){
  //         return true
  //       }
  //     }return false
  //   }
  // }
}
</script>

<style>
</style>