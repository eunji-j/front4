<template>
  <div>
      <div class="form-group">
          <input class="form-control col-6 offset-3 my-3" type="text" v-model="credential.username" placeholder="id">
          <input class="form-control col-6 offset-3 my-3" type="password" v-model="credential.password" placeholder="password">
          <input class="form-control col-6 offset-3 my-3" type="password" v-model="credential.password2" placeholder="password">
          <button class="btn btn-primary" @click="signup">회원가입</button>
      </div>
  </div>
</template>

<script>
export default {
    data: function(){
        return {
            credential: {
                username: '',
                password: '',
                password2: '',
            }
        }
    },
    methods: {
        signup(){
            console.log('회원가입 시도')
        }
    }
}
</script>

<style>

</style>