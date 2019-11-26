<template>
  <div>
    <h4>평점 등록하기</h4>
    <div class="form-group d-flex" style="width:700px;">
      <div class="mr-3 col-3 text-center">
        <input type="range" class="d-block custom-range" min="0" max="10" v-model="review.star">
        <font color="white" size=4>{{review.star}}</font>
      </div>
      <input type="text" class="form-control col-8" v-model="review.content">
      <input type="submit" class="btn btn-primary ml-2 mb-2" v-if="isAuthenticated" @click="register()">
      <input type="submit" class="btn btn-primary ml-2 mb-2" v-else onclick="alert('로그인 후 이용해주세요.')">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
  data(){
    return {
      review: {
        content: '',
        star: 5,
      },
      reviews: [],
      isAuthenticated: this.$session.has('jwt')
    }
  },
  props: {
    movie: Object()
  },
  methods:{
    register(){
      this.$session.start()
      const token = this.$session.get('jwt')
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.user_id
      console.log(decodedToken)
      const requestHeader = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      const form = new FormData()
      form.append('content', this.review.content)
      form.append('star', this.review.star)
      form.append('user', userId)
      form.append('movie', this.movie.id)

      axios.post(`http://localhost:8000/api/v1/movies/${this.movie.id}/review/`, form, requestHeader)
        .then((res)=>{
          console.log(res)
          this.reviews.push(res.data)
        })
        .catch((e)=>{
          console.log(e)
        })
    }
  },
  updated(){
    this.isAuthenticated = this.$session.has('jwt')
  }
}
</script>

<style>

</style>