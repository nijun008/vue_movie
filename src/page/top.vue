<template>
  <div>
    <myHeader></myHeader>

     <div class="top content">
      <h3>豆瓣电影Top 250</h3>
      <ul>
        <li v-for="(i, index) in top" class="clearfloat">
          <div class="top-position fl">{{ index + 1 }}</div>
          <div class="top-img fl">
            <router-link :to="'/subject/' + i.id">
              <img :src="i.images.large">
            </router-link>
          </div>
          <div class="top-info fl">
            <p class="top-title">
              <router-link :to="'/subject/' + i.id">{{ i.title }}({{ i.year }})</router-link>
            </p>
            <p v-if="i.rating.average != 0" class="top-star">豆瓣评分 <span>{{ i.rating.average }}</span></p>
            <p v-else>暂无评分</p>
            <p>
              <span v-for="(j,index) in i.genres"><span v-if="index != 0">/</span>{{ j }}</span><span v-for="j in i.casts">/{{ j.name }}</span>
            </p>
            <p>{{ i.collect_count }}人喜欢</p>
          </div>
        </li>
        <div class="top-tip" v-if="loading">加载中.....</div>
        <div class="top-tip" v-if="done">没有更多了！</div>
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
      start: 0,
      top: [],
      loading: true,
      done: false
    }
  },
  created () {
    this.getTop()
    document.title = 'top250'
  },
  mounted () {
    if (this.$route.path === '/top') {
      window.addEventListener('scroll', this.handleScroll)
    } else {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    getTop () {
      this.axios.get('/v2/movie/top250?start=' + this.start)
      .then(res => {
        this.top = this.top.concat(res.data.subjects)
        this.start += 20
        if (this.start >= 250) {
          this.loading = false
          this.done = true
        } else {
          window.addEventListener('scroll', this.handleScroll)
        }
      })
    },
    handleScroll () {
      if (document.body.clientHeight - window.scrollY < 1500) {
        this.loading = true
        window.removeEventListener('scroll', this.handleScroll)
        this.getTop()
      }
    }
  }
}
</script>
<style>
  .top{
    padding-top: 30px;
    min-height: 460px;
  }
  .top>h3{
    line-height: 40px;
    margin-bottom: 30px;
  }
  .top li{
    margin-bottom: 26px;
  }
  .top-position{
    color: #888;
    width: 25px;
  }
  .top-img{
    width: 100px;
  }
  .top-info{
    line-height: 22px;
    color: #5d5d5d;
    font-size: 12px;
    padding-left: 10px;
  }
  .top-title{
    font-size: 14px;
  }
  .top-star span{
    color: #e09015;
  }
  .top-tip{
    text-align: center;
    font-size: 18px;
    line-height: 40px;
    color: #888;
    padding-bottom: 20px;
  }
</style>