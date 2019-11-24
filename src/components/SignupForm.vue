<template>
  <div>
      <div v-if="errors.length" class="alert alert-danger">
          <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
      </div>
      <div class="form-group">
        <input class="form-control col-6 offset-3 my-3" type="text" v-model="credential.username" placeholder="id">
        <input class="form-control col-6 offset-3 my-3" type="password" v-model="password" placeholder="password">
        <input class="form-control col-6 offset-3 my-3" type="password" v-model="credential.password2" placeholder="password">
        <div>
          <div v-for="genre in genres" :key="genre.id" class="form-control d-inline">
            <input type="checkbox" :id=genre.name :value=genre.id v-model="checkedGenres">
            <label :for=genre.name>{{genre.name}}</label>
          </div>
        </div>
        <br>
        <span>체크한 이름: {{ checkedGenres }}</span>
      </div>
      <button class="btn btn-primary" @click="signup">회원가입</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            genres: [],
            password: '',
            credential: {
                username: '',
                password2: '',
            },
            errors: [],
            checkedGenres: []
        }
    },
    methods: {
        signup(){
            console.log('회원가입 시도')
            if (this.checkForm()){
                axios.post('http://localhost:8000/api/v1/accounts/signup/', this.credential)
                    .then((res)=>{
                        console.log(res)
                    })
                    .catch((e)=>{
                        console.log(e)
                    })
            }
        },
        checkForm(){
            this.errors = []
            if (this.password != this.password2){return true}
            else {
                if (this.credential.password.length < 8) {this.errors.push('비밀번호는 8글자가 넘어야합니다.')}
            }
            if (!this.credential.username) {this.errors.push('아이디를 입력해주세요.')}
        }
    },
    mounted(){
      const GENRE_URL = 'http://localhost:8000/api/v1/movies/genres/'
      axios.get(GENRE_URL)
        .then((res)=>{
            this.genres = res.data
        })
        .catch((e)=>{
            console.log(e)
        })
    } 
}
</script>

<style>

</style>