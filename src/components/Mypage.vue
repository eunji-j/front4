<template>
  <div class="text-light">
    <div class="mt-5">
      <h3 class="d-flex mb-4">선호하는 장르 <h3 class="ml-3"><p v-for="(genre, index) in user.like_genres" :Key="`genre-${index}`" class="badge badge-info mx-1">{{genre.name}}</p></h3></h3>
      
      <h3 class="d-flex">보고싶어요</h3>
      <div v-if="likeMovies.length" class="row">
        <div id="img" v-for="(movie, index) in likeMovies" :key="`movie-${index}`" class="col-12 col-md-6 col-lg-2 my-3">
          <div @click="detail(movie.id)">
            <img :src=movie.image width="100%" alt="">
            <!-- <p class="d-flex">{{movie.title}}</p> -->
          </div>
        </div>
      </div>
      <div v-else>
        <h4 class="text-muted ">등록된 작품이 없어요</h4>
      </div>
    </div>
    <div class="mt-5">
      <h3 class="d-flex">평가한 작품</h3>
      <div v-if="reviews.length" class="row">
        <div id="img" @click="detail(review.movie.id)" v-for="(review, index) in reviews" :key="`review-${index}`" class="col-12 col-md-6 col-lg-2 my-3 text-white">
          <img  style="opacity:0.4;" :src=review.movie.image class="card-img">
          <div class="card-img-overlay align-items-center">
            <button @click="reviewDelete(review)" type="button" class="close" aria-label="Close">
              <span aria-hidden="true" class="text-light">&times;</span>
            </button>
            <h5 class="card-title pt-4">{{review.content}}</h5>
            <h4 class="card-text"><i class="fas fa-star"></i> {{review.star}}</h4>
            <p class="card-text">{{review.created_at}}</p>
          </div>
          <!-- <p class="d-flex">{{review.movie.title}}</p> -->
        </div>
      </div>
      <div v-else>
        <h4 class="text-muted">등록된 작품이 없어요</h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      token: '',
      userId: '',
      likeMovies: [],
      reviews: [],
      user: ''
    }
  },
  methods: {
    detail(id){
      this.$router.push(`/detail?id=${id}`)
    },
    reviewDelete(review){
      const ok = confirm('평점을 삭제하시겠습니까?')
      if (ok){
        const requestHeader = {
            headers: {
            Authorization: 'JWT ' + this.token
            }
        }
        axios.delete(`http://localhost:8000/api/v1/movies/${review.id}/review/`, requestHeader)
            .then(()=>{
            })
            .catch((e)=>{
                console.log(e)
            })
      }
    },
    getInfo(){
      const requestHeader = {
        headers: {
          Authorization: 'JWT ' + this.token
        }
      }

      axios.get(`http://localhost:8000/api/v1/accounts/${this.userId}/`, requestHeader)
        .then((res)=>{
          this.user = res.data['user']
          this.likeMovies = res.data['movies']
          this.reviews = res.data['reviews']
        })
        .catch((e)=>{
          console.log(e)
        })
    }
  },
  mounted(){
    // route로 전달받은 데이터 저장
    this.userId = this.$route.params.userId

    this.$session.start()
    this.token = this.$session.get('jwt')
    this.getInfo()
  },
  watch:{
    reviews:{
      handler(){
        this.getInfo()
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