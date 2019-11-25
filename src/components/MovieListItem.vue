<template>
    <div class="col-2 text-center" @click="detail">
      <img :src=movie.image width="100%" alt="이미지가 없습니다.">
      <p>{{movie.title}}</p>
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

</style>