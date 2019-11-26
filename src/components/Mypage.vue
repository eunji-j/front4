<template>
  <div class="text-light">
    <div class="mt-5">
      <h3 class="d-flex">보고싶어요</h3>
      <div class="d-flex">
        <div v-for="(movie, index) in likeMovies" :key="`movie-${index}`" class="col-3">
          <div @click="detail(movie.id)">
            <img :src=movie.image width="100%" alt="">
            <p class="text-center">{{movie.title}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <h3 class="d-flex">평가한 작품</h3>
      <div class="d-flex">
        <div v-for="(review, index) in reviews" :key="`review-${index}`" class="col-3">
          <div>
            <img :src=review.movie width="100%" alt="">
            <p class="text-center">{{review}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      userId: '',
      likeMovies: [],
      reviews: []
    }
  },
  methods: {
    detail(id){
      this.$router.push(`/detail?id=${id}`)
    }
  },
  mounted(){
    // route로 전달받은 데이터 저장
    this.userId = this.$route.params.userId

    this.$session.start()
    const token = this.$session.get('jwt')

    const requestHeader = {
      headers: {
        Authorization: 'JWT ' + token
      }
    }

    axios.get(`http://localhost:8000/api/v1/accounts/${this.userId}/`, requestHeader)
      .then((res)=>{
        this.likeMovies = res.data['movies']
        this.reviews = res.data['reviews']
      })
      .catch((e)=>{
        console.log(e)
      })
  }
}
</script>

<style>

</style>