<template>
  <div>
      <div v-if="loading" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
      </div>
      <div v-else class="login-div">
        <div v-if="errors.length" class="error-list alert alert-danger">
            <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
        </div>
        <div class="form-group">
            <input class="form-control col-6 offset-3 my-3" type="text" v-model="credential.username" placeholder="id">
            <input class="form-control col-6 offset-3 my-3" type="password" v-model="credential.password" placeholder="password">
            <button class="btn btn-primary" @click="login">로그인</button>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    data: function(){
        return {
            credential: {
                username: '',
                password: '',
            },
            loading: false,
            errors: [],
        }
    },
    methods: {
        login(){
            if (this.checkForm()){
                console.log('로그인 시도')
                console.log(this.credential)
                axios.post('http://localhost:8000/api-token-auth/', this.credential)
                    .then((res)=>{
                        this.loading = true
                        console.log(this.$session)
                        this.$session.start()
                        this.$session.set('jwt', res.data.token)
                        
                        router.push('/')
                    })
                    .catch((e)=>{
                        console.log(e)
                        this.errors.push('로그인 실패')
                    })
            }
        },
        checkForm(){
            // 배열초기화로 데이터가 쌓이는 것 방지
            this.errors = []
            if (this.credential.password.length < 8) {this.errors.push('비밀번호는 8글자가 넘어야합니다.')}
            if (!this.credential.username) {this.errors.push('아이디를 입력해주세요.')}
            console.log(this.errors)
            if (this.errors.length === 0) {return true}
        }
    }
}
</script>

<style>

</style>