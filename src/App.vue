<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: black; height: 80px;">
      <router-link to="/" class="navbar-brand">DoDoPlay</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to='/' class="nav-link">홈</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/select" class="nav-link">탐색하기</router-link>
          </li>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="제목, 감독, 배우로 검색">
          </form>
          <div v-if="isAuthenticated" class="d-flex">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{username}} 님
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <!-- 이름을 가지는 routes에 연결할 때 prop으로 데이터를 전달할 수 있다. router.push()와 같다. -->
                <router-link class="dropdown-item" v-if="userId" :to="{name:'mypage', params: {userId: `${userId}`}}">MyPage</router-link>

                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" to="/logout" @click.prevent="logout">Logout</a>
              </div>
            </li>
          </div>
          <div v-else class="d-flex">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/signup">Signup</router-link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
    <div class="px-5 my-5">
      <!-- Vue.js Router 현재 페이지 갱신하기 -->
      <router-view :key="$route.fullPath"/>
    </div>
  </div>
      
</template>

<script>
import jwtDecode from 'jwt-decode'
import router from './router'
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: this.$session.has('jwt'),
      username: '',
      userId: '',
    }
  },
  methods: {
    logout: function(){
      this.$session.destroy()
      router.push('/login')
    },
  },
  mounted(){
    if (this.isAuthenticated){
      this.$session.start()
      const token = this.$session.get('jwt')
      const decodedToken = jwtDecode(token)
      this.username = decodedToken.username
      this.userId = decodedToken.user_id
    }
  },
  created() {
    this.isAuthenticated = this.$session.has('jwt')
    if (this.isAuthenticated){
      this.$session.start()
      const token = this.$session.get('jwt')
      const decodedToken = jwtDecode(token)
      this.username = decodedToken.username
      this.userId = decodedToken.user_id
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
