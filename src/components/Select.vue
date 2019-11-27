<template>
  <div>
    <div class="row d-flex justify-content-between">
      <div class="col-6 mx-auto">
        <h4 class="d-flex text-light">상황별</h4>
        <div class="card py-4">
          <h5>STEP 1.</h5>
          <div>
            <p v-for="(s, index) in sort1" :key="s-`${index}`" @click="select(1, s.id)" class="btn btn-outline-secondary rounded-pill m-1">{{s.name}}</p>
          </div>
          <h5 class="py-4">STEP 2.</h5>
        </div>
      </div>
      <div class="col-6 mx-auto">
        <h4 class="d-flex text-light">분위기별</h4>
        <div class="card py-4">
          <h5>STEP 1.</h5>
          <div>
            <p v-for="(s, index) in sort2" :key="ss-`${index}`" @click="select(2, s.id)" class="btn btn-outline-secondary rounded-pill m-1">{{s.name}}</p>
          </div>
          <h5 class="py-4">STEP 2.</h5>
        </div>
      </div>
    </div>

    <MovieList :movies="movies"/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      sort1: [],
      sort2: [],
      situations: [],
      moods: [],
      genres: [],
      selectedItem: []
    }
  },
  methods:{
    addItem(item){
      this.selectedItem.push(item)
    },
    getMovies(){
      axios.get()
    },
    select(s, id){
      axios.get(`http://localhost:8000/api/v1/movies/sort/${s}/${id}/`)
        .then((res)=>{
          this.situations = res.data[0].hashtags
        })
        .catch((e)=>{
          console.log(e)
        })
    }
  },
  mounted(){
    axios.get(`http://localhost:8000/api/v1/movies/sorts/`)
      .then((res)=>{
        // console.log(res)
        this.sort1 = res.data['sort1']
        this.sort2 = res.data['sort2']
      })
      .catch((e)=>{
        console.log(e)
      })
  },
  watch:{
    selectedItem:{
      handler(){
        this.getMovies()
      }
    }
  }
}
</script>

<style>

</style>