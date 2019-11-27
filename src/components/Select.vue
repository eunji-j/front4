<template>
  <div>
    <div class="row d-flex justify-content-between">
      <div class="col-6 mx-auto">
        <h4 class="d-flex text-light">상황별</h4>
        <div class="card py-4">
          <h5>STEP 1. 키워드 선택</h5>
          <div>
            <p v-for="(s, index) in sort1" :key="`1${index}`" @click="select1(1, s.id)" class="btn btn-outline-secondary rounded-pill m-1">{{s.name}}</p>
          </div>
          <h5 class="pt-4">STEP 2. 태그 선택</h5>
          <div>
            <p v-for="(situation, index) in situations" :key="`2${index}`" @click="select2(situation.id)" class="btn btn-outline-secondary rounded-pill m-1">{{situation.content}}</p>
          </div>
        </div>
      </div>
      <div class="col-6 mx-auto">
        <h4 class="d-flex text-light">분위기별</h4>
        <div class="card py-4">
          <h5>STEP 1. 키워드 선택</h5>
          <div>
            <p v-for="(s, index) in sort2" :key="`3${index}`" @click="select1(2, s.id)" class="btn btn-outline-secondary rounded-pill m-1">{{s.name}}</p>
          </div>
          <h5 class="pt-4">STEP 2. 태그 선택</h5>
          <div>
            <p v-for="(mood, index) in moods" :key="`4${index}`" @click="select2(mood.id)" class="btn btn-outline-secondary rounded-pill m-1">{{mood.content}}</p>
          </div>
        </div>
      </div>
    </div>
    <br>
    <MovieList :movies="movies"/>
  </div>
</template>

<script>
import axios from 'axios'
import MovieList from './MovieList.vue'
export default {
  data(){
    return {
      sort1: [],
      sort2: [],
      situations: [],
      moods: [],
      genres: [],
      movies: []
    }
  },
  components:{
    MovieList
  },
  methods:{
    addItem(item){
      this.selectedItem.push(item)
    },
    select1(s, id){
      axios.get(`http://localhost:8000/api/v1/movies/sort/${s}/${id}/`)
        .then((res)=>{
          if (s == 1){
            this.situations = res.data[0].hashtags
          }else{
            this.moods = res.data[0].hashtags
          }
          
        })
        .catch((e)=>{
          console.log(e)
        })
    },
    select2(id){
      axios.get(`http://localhost:8000/api/v1/movies/hashtag/${id}/`)
        .then((res)=>{
          console.log(res)
          this.movies = res.data
        })
        .catch((e)=>{
          console.log(e)
        })
    }
  },
  mounted(){
    axios.get(`http://localhost:8000/api/v1/movies/sorts/`)
      .then((res)=>{
        console.log(res)
        this.sort1 = res.data['sort1']
        this.sort2 = res.data['sort2']
      })
      .catch((e)=>{
        console.log(e)
      })
  }
}
</script>

<style>

</style>