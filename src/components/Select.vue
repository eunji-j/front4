<template>
  <div>
    <h1>영화 목록</h1>
    <h2>장르 선택</h2>
    <select class="form-control" v-model="selectedGenreId">
      <option value="">전체보기</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id" >
        {{genre.name}}
      </option>
    </select>
    <div class="row">
      <MovieListItem v-for="movie in onselectedGenre" :key="movie.id" :movie="movie"/>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>