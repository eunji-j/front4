<template>
  <div>
    <h4>평점</h4>
    <div class="form-group d-flex mt-4">
      <div class="mr-3 col-3 text-center">
        <input type="range" class="d-block custom-range" min="0" max="10" v-model="review.star">
        <font color="white" size=4>{{review.star}}점</font>
      </div>
      <input type="text" class="form-control col-7" v-model="review.content" placeholder="내용을 입력해주세요.">
      <input type="submit" class="btn btn-secondary ml-2 mb-2 col-1" v-if="isAuthenticated" @click="register()" value="등록">
      <input type="submit" class="btn btn-secondary ml-2 mb-2 col-1" v-else @click="checkLogin()" value="등록">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      review: {
        content: '',
        star: 5
      },
      reviews: [],
      isAuthenticated: this.$session.has('jwt')
    }
  },
  props: {
    movie: Object()
  },
  methods:{
    checkLogin(){
      alert('로그인 후 이용해주세요.')
      this.$router.push('/login')
      this.review.content = ''
    },
    register(){
      this.$session.start()
      const token = this.$session.get('jwt')
      const requestHeader = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      const form = new FormData()
      form.append('content', this.review.content)
      form.append('star', this.review.star)

      axios.post(`http://localhost:8000/api/v1/movies/${this.movie.id}/review/`, form, requestHeader)
        .then((res)=>{
          // console.log(res)
          this.reviews.push(res.data)
        })
        .catch((e)=>{
          console.log(e)
        })
      this.review.content = ''
    }
  },
  updated(){
    this.isAuthenticated = this.$session.has('jwt')
  }
}
</script>

<style>

</style>