<template>
  <div>
    <h4>평점 등록하기</h4>
    <div class="form-group d-flex" style="width:700px;">
      <input type="range" class="custom-range mr-3 col-3" min="0" max="5" v-model="form.star">
      <input type="text" class="form-control col-8" v-model="form.content">
      <input type="submit" class="btn btn-primary ml-2" @click="register()">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
  data(){
    return {
      form: {
        username: '',
        content: '',
        star: ''
      }
    }
  },
  props: {
    movie: String
  },
  methods:{
    register(){
      this.$session.start()
      const token = this.$session.get('jwt')
      const decodedToken = jwtDecode(token)
      this.userId = decodedToken.user_id

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




      axios.post(`http://localhost:8000/api/v1/movies/${this.movie.id}/review/`)
    }
  }
}
</script>

<style>

</style>