<template>
  <div>
      <div v-if="errors.length" class="alert alert-danger">
          <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
      </div>
      <div class="form-group">
          <input class="form-control col-6 offset-3 my-3" type="text" v-model="credential.username" placeholder="id">
          <input class="form-control col-6 offset-3 my-3" type="password" v-model="password" placeholder="password">
          <input class="form-control col-6 offset-3 my-3" type="password" v-model="credential.password2" placeholder="password">
          <button class="btn btn-primary" @click="signup">회원가입</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data: function(){
        return {
            password: '',
            credential: {
                username: '',
                password2: '',
            },
            errors: []
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
    }
}
</script>

<style>

</style>