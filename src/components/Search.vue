<template>
    <div>
        검색검색
        <!-- <h4 class="mb-4">제목 검색결과</h4>
        <div class="mx-3">
            <div v-for="(movie, index) in movies" :key="`movie-${index}`">
                <h5><a href="{% url 'articles:detail' article.id %}">{{movie.title}}</a></h5>
                {{movie.user}} &nbsp;|&nbsp; {{movie.created_at|date:'y.m.d H:m:s'}}
            </div>
        </div>

        <hr class="my-5">
        <h4 class="mb-4">감독 검색결과</h4>
        <div class="mx-3">
            <div v-for="(movie, index) in movies" :key="`movie-${index}`">
                <h5><a href="{% url 'articles:detail' article.id %}">{{article.title}}</a></h5>
                {{article.user}} &nbsp;|&nbsp; {{article.created_at|date:'y.m.d H:m:s'}}
            </div>
        </div>

        <hr class="my-5">
        <h4 class="mb-4">배우 검색결과</h4>
        <div class="mx-3">
            <div v-for="(movie, index) in movies" :key="`movie-${index}`">
                <h5><a href="{% url 'articles:detail' article.id %}">{{article.title}}</a></h5>
                {{article.user}} &nbsp;|&nbsp; {{article.created_at|date:'y.m.d H:m:s'}}
            </div>
        </div> -->
    </div>
</template>

<script>

export default {
    data(){
        return {
            keyword: ''
        }
    },
    mounted(){
        // this.keyword = this.$route.query
        console.log(this.keyword)
    }

}
</script>

<style>

</style>