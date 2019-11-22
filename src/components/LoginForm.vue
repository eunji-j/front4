<template>
  <div>
      <div v-if="loading" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
      </div>
      <div class="form-group">
          <input class="form-control col-6 offset-3 my-3" type="text" v-model="credential.username" placeholder="id">
          <input class="form-control col-6 offset-3 my-3" type="password" v-model="credential.password" placeholder="password">
          <button class="btn btn-primary" @click="login">로그인</button>
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
            loading: false
        }
    },
    methods: {
        login(){
            console.log('로그인 시도')
            axios.post('http://localhost:8000/api-token-auth/', this.credential)
                .then((res)=>{
                    this.loading = true
                    console.log(this.$session)
                    this.$session.start()
                    this.$session.set('jwt', res.data.token)
                    
                    router.push('/')
                })
                .catch((e)=>{
                    this.loading = true
                    console.log(e)
                })
        }
    }
}
</script>

<style>

</style>