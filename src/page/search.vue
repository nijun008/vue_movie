<template>
  <div>
    <myHeader @searchevent="changeword"></myHeader>
    
    <div class="search content">
      <h3>{{ keyword }} 的搜索结果</h3>
      <ul>
        <li v-for="i in result" class="clearfloat">
          <div class="search-img fl">
            <router-link :to="'/subject/' + i.id">
              <img :src="i.images.large">
            </router-link>
          </div>
          <div class="search-info fl">
            <p class="search-title">
              <router-link :to="'/subject/' + i.id">{{ i.title }}({{ i.year }})</router-link>
            </p>
            <p v-if="i.rating.average != 0" class="search-star">豆瓣评分 <span>{{ i.rating.average }}</span></p>
            <p v-else>暂无评分</p>
            <p>
              <span v-for="(j,index) in i.genres"><span v-if="index != 0">/</span>{{ j }}</span><span v-for="j in i.casts">/{{ j.name }}</span>
            </p>
            <p>{{ i.collect_count }}人喜欢</p>
          </div>
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
    document.title = '搜索' + this.keyword
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
  .search{
    padding-top: 30px;
  }
  .search>h3{
    line-height: 40px;
  }
  .search li{
    margin-bottom: 26px;
  }
  .search-img{
    width: 100px;
  }
  .search-info{
    line-height: 22px;
    color: #5d5d5d;
    font-size: 12px;
    padding-left: 10px;
  }
  .search-title{
    font-size: 14px;
  }
  .search-star span{
    color: #e09015;
  }
</style>