<template>
  <div>
    <myHeader @searchevent="changeword"></myHeader>
    
    <div class="theaters">
      <h4>{{ keyword }} 的搜索结果</h4>
      <ul>
        <li v-for="i in result">
          <router-link :to="'/subject/' + i.id">
            <div class="theaters-img">
              <img :src="i.images.large">
            </div>
          </router-link>
          <router-link :to="'/subject/' + i.id">
            <p class="theaters-title">
              {{ i.title }}
            </p>
          </router-link>
          <p v-if="i.rating.average != 0" class="theaters-star">豆瓣评分 <span>{{ i.rating.average }}</span></p>
          <p v-else>暂无评分</p>
        </li>
      </ul>
    </div>

    <myFooter></myFooter>
  </div>
</template>
<script>
import myHeader from '../components/header.vue'
import myFooter from '../components/footer.vue'
export default {
  components: { myHeader, myFooter },
  data () {
    return {
      keyword: this.$route.params.keyword,
      result: {}
    }
  },
  created () {
    this.getSearch()
  },
  methods: {
    getSearch () {
      this.axios.get('/v2/movie/search?q=' + this.keyword)
      .then(res => {
        this.result = res.data.subjects
      })
    },
    changeword (msg) {
      this.keyword = msg
      this.getSearch()
    }
  }
}
</script>
<style>
  
</style>