<template>
  <div>
      <table class="table table-sm text-light">
        <tbody>
            <tr v-for="(review, index) in reviews" :key="index">
                <td v-if="review.star === 10" style="font-size:14pt; width:200px;" class="align-middle"><span style="color:yellow;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span> {{review.star}}</td>
                <td v-else-if="review.star === 9" style="font-size:14pt; width:200px;" class="align-middle"><span style="color:yellow;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></span> {{review.star}}</td>
                <td v-else-if="review.star === 8" style="font-size:14pt; width:200px;" class="align-middle"><span style="color:yellow;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i></span> {{review.star}}</td>
                <td v-else-if="review.star === 7" style="font-size:14pt; width:200px;" class="align-middle"><span style="color:yellow;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i></span> {{review.star}}</td>
                <td v-else-if="review.star === 6" style="font-size:14pt; width:200px;" class="align-middle"><span style="color:yellow;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></span> {{review.star}}</td>
                <td v-else-if="review.star === 5" style="font-size:14pt; width:200px;" class="align-middle"><span style="color:yellow;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i></span> {{review.star}}</td>
                <td v-else-if="review.star === 4" style="font-size:14pt; width:200px;" class="align-middle"><span style="color:yellow;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></span> {{review.star}}</td>
                <td v-else-if="review.star === 3" style="font-size:14pt; width:200px;" class="align-middle"><span style="color:yellow;"><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></span> {{review.star}}</td>
                <td v-else-if="review.star === 2" style="font-size:14pt; width:200px;" class="align-middle"><span style="color:yellow;"><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></span> {{review.star}}</td>
                <td v-else-if="review.star === 1" style="font-size:14pt; width:200px;" class="align-middle"><span style="color:yellow;"><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></span> {{review.star}}</td>
                <td v-else-if="review.star === 0" style="font-size:14pt; width:200px;" class="align-middle"><span style="color:yellow;"><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></span> {{review.star}}</td>
                <td class="align-middle">{{review.content}}</td>
                <td class="text-muted align-middle">{{review.user}}</td>
                <td class="text-muted align-middle">{{review.created_at}}</td>
                <td><button class="btn btn-outline-light" v-if="review.user === userId" @click="reviewDelete(review)">삭제</button></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
    data(){
        return {
            token: '',
            userId: ''
        }
    },
    props:{
        reviews: Array
    },
    methods: {
        reviewDelete(review){
            const requestHeader = {
                headers: {
                Authorization: 'JWT ' + this.token
                }
            }
            axios.delete(`http://localhost:8000/api/v1/movies/${review.id}/review/`, requestHeader)
                .then((res)=>{
                    console.log(res)
                })
                .catch((e)=>{
                    console.log(e)
                })
        }
    },
    mounted() {
        this.$session.start()
        this.token = this.$session.get('jwt')
        const decodedToken = jwtDecode(this.token)
        this.userId = decodedToken.user_id
    }
}
</script>

<style>

</style>