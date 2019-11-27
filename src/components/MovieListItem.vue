<template>
    <div class="col-2 text-light" @click="detail">
      <div id="img">
        <img :src=movie.image width="100%" alt="이미지가 없습니다.">
        <p class="d-flex">{{movie.title}}</p>
      </div>
    </div>
</template>

<script>
import router from '../router'
export default {
  props: [
    'movie'
  ],
  methods: {
    detail(){
      router.push(`/detail?id=${this.movie.id}`)
    }
  }
}
</script>

<style>
#img {
  transition: transform .2s; /* Animation */
}
#img:hover {
  opacity: 50%;
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}
</style>