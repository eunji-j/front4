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
        <button class="btn btn-primary btn-lg mr-2">수정</button>
        <button class="btn btn-danger btn-lg mr-2">삭제</button> -->
        <h4 class="d-inline text-muted"><i class="fas fa-plus"></i> 보고싶어요</h4>
      </div>
      <p v-for="(hashtag, index) in movie.hashtags" :key="`hashtag-${index}`" class="d-inline mr-3 text-primary"># {{hashtag.content}}</p>
    </div>

    <div class="col-7">
      <img :src="movie.image" style="width:50%; opacity:0.5;">
    </div>

    <div>
      <h4>비슷한 작품</h4>

    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      movieId: '',
      movie: '',
      similarMovie: []
    }
  },
  methods: {
  },
  mounted() {
    this.movieId = this.$route.query
    // console.log(this.movieId.id)
    const MOVIE_URL = `http://localhost:8000/api/v1/movies/detail/${this.movieId.id}`
    axios.get(MOVIE_URL)
      .then((res)=>{
        this.movie = res.data
        // console.log(res.data)
      })
      .catch((e)=>{
        console.log(e)
      })
      
    axios.get(`http://localhost:8000/api/v1/movies/hashtags/${this.movieId.id}`)
      .then((res)=>{
        console.log(res)
        this.similarMovie.append(res)
      })
      .catch((e)=>{
        console.log(e)
      })
  },
}
</script>

<style>

</style>