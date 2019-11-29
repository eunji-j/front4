<template>

  <div class="mt-5">
    <div class="row text-white text-left mx-5">
      
      <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <iframe width="100%" height="700" :src="`${movie.video}?rel=0;amp;autoplay=1`" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>

      <div class="col-7 my-5">
        <h1 class="display-4">{{movie.title}}</h1>
        <h3 class="d-inline"><span class="badge badge-light mr-2">평균 별점</span></h3><h4 class="d-inline"> {{movie.score}}</h4><h5 class="d-inline text-muted ml-3">{{movie.rating}}</h5>
        <!-- <hr class="my-3 bg-white"> -->
        <br><br>
        <h5 v-for="(hashtag, index) in movie.hashtags" :key="`hashtag-${index}`" class="d-inline mr-3 text-info"># {{hashtag.content}}</h5>
        <p class="lead">{{movie.description}}</p>
        <h5><span class="lead mr-4">감독</span>{{movie.director}}</h5>
        <h5><span class="lead mr-4">출연</span>{{movie.actor}}</h5>
        <span class="lead mr-4">장르</span>
        <h5 v-for="genre in movie.genres" :key="genre.id" class="lead d-inline">{{genre.name}}|</h5>
        <!-- <p class="lead">{{movie.open_year}}</p>  -->
        
        <div class="my-3">
          <button class="btn btn-danger btn-lg mr-5" style="width:110px;" data-toggle="modal" data-target="#exampleModal">▶ 재생</button>
          <h4 class="d-inline" @click="like" v-if="ok" style="color: red;"><i class="fas fa-check" style="color: red;"></i> 보고싶어요</h4>
          <h4 class="d-inline align-middle" @click="like" v-else><i class="fas fa-plus"></i> 보고싶어요</h4>
        </div>
      </div>

      <div class="col-5 d-flex justify-content-center">
        <img :src="movie.image" style="width:65%; opacity:0.7;">
      </div>
    </div>
    <div class="text-white text-left my-5 mx-5">
      <Review :movie="movie"/>
      <ReviewList :reviews="reviews"/>
    </div>
    <h4 class="text-white text-left mx-5 mt-5">비슷한 작품</h4> 
    <div class="mx-5 row">
      <div v-for="(movie2, index) in similarMovie" :key="`movie2-${index}`" class="col-2">
          <img id="img" v-if="movie.title != movie2.title" @click="detail(movie2.id)" :src=movie2.image width="100%">
          <!-- <p class="text-center">{{movie2.title}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Review from './Review.vue'
import ReviewList from './ReviewList.vue'
export default {
  data() {
    return {
      movieId: '',
      movie: Object,
      similarMovie: [],
      isAthenticated: this.$session.has('jwt'),
      userId: '',
      ok: false,
      reviews: []
    }
  },
  components: {
    Review,
    ReviewList,
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
              this.ok = res.data.is_ok
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
    },
    review(){
      axios.get(`http://localhost:8000/api/v1/movies/${this.movieId.id}/reviews/`)
        .then((res)=>{
          this.reviews = res.data
        })
        .catch((e)=>{
          console.log(e)
        })
    }
  },
  mounted() {
    this.movieId = this.$route.query
    this.isAthenticated = this.$session.has('jwt')
    this.$session.start()
    
    const MOVIE_URL = `http://localhost:8000/api/v1/movies/detail/${this.movieId.id}/`
    axios.get(MOVIE_URL)
      .then((res)=>{
        this.movie = res.data

        if (this.isAthenticated){
          const token = this.$session.get('jwt')
          const decodedToken = jwtDecode(token)
          this.userId = decodedToken.user_id
          // 영화상세정보를 가져오면서 동시에 보고싶어요를 체크했는지 검사한다.
          for (let i=0; i<res.data.users.length; i++){
            if (this.movie.users[i] === this.userId){
              this.ok = true
            }
          }
        }

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
    this.review()
      // console.log(this.movie)
      // if (this.movieId.id !== undefined && this.movie.users !== undefined){
      //   // console.log(this.movie.users.length)
      //   for (let i=0; i<this.movie.users.length; i++){
      //     if (this.movie.users[i] == this.userId){
      //       this.ok = true
      //     }
      //   }
      // this.isAthenticated = this.$session.has('jwt')
      // }
  },
  watch:{
    reviews:{
      handler(){
        this.review()
      }
    }
  }
}
</script>

<style>
#img {
  transition: transform .2s; /* Animation */
}
#img:hover {
  opacity: 50%;
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}
</style>