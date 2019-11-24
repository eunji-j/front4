<template>
  <div id="genre">
    <div id="nav">
      <router-link to="/">드라마</router-link>
      <router-link to="/">판타지</router-link>
      <router-link to="/">공포</router-link>
      <router-link to="/">로맨스</router-link>
      <router-link to="/">스릴러</router-link>
      <router-link to="/">다큐멘터리</router-link>
      <router-link to="/">코미디</router-link>
      <router-link to="/">가족</router-link>
      <router-link to="/">애니메이션</router-link>
      <router-link to="/">범죄</router-link>
      <router-link to="/">SF</router-link>
      <router-link to="/">액션</router-link>
    </div>
    <div class="px-5">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
    name: 'genre',

}
</script>

<style>

</style>