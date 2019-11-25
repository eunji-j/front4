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
            <input type="checkbox" :id=genre.name :value=genre.id v-model="credential.checkedGenres">
            <label :for=genre.name>{{genre.name}}</label>
          </div>
        </div>
        <br>
        <span>체크한 이름: {{ credential.checkedGenres }}</span>
      </div>
      <button class="btn btn-primary" @click="signup">회원가입</button>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    data(){
        return {
            genres: [],
            password: '',
            credential: {
                username: '',
                password2: '',
                checkedGenres: []
            },
            errors: [],
            
        }
    },
    methods: {
        signup(){
            console.log('회원가입 시도')
            let form = new FormData() 
            form.append('username', this.credential.username) 
            form.append('password',this.credential.password2)
            // 여러개의 선택값을 하나씩 넘겨준다.
            for (let i=0; i<this.credential.checkedGenres.length; i++) {
                form.append('like_genres',this.credential.checkedGenres[i])
            }

            if (this.checkForm()){
                console.log(this.credential)
                axios.post('http://localhost:8000/api/v1/accounts/signup/', form)
                    .then((res)=>{
                        console.log(res)
                        router.push('/login')
                    })
                    .catch((e)=>{
                        console.log(e)
                    })
            }
        },
        checkForm(){
            this.errors = []
            if (this.password.length < 8 || this.credential.password2.length < 8) {this.errors.push('비밀번호는 8글자가 넘어야합니다.')}
            if (!this.credential.username) {this.errors.push('아이디를 입력해주세요.')}
            if (!this.credential.checkedGenres.length) {this.errors.push('좋아하는 장르를 선택해주세요.')}
            if (this.password === this.credential.password2){
                if(!this.errors.length){return true}
            }
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