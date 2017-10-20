<template>
  <div>
    <myHeader></myHeader>

     <div class="usrank content" v-if="usrank.length > 0">
      <h3>北美票房榜<span class="date">{{ date }}</span></h3>
      <ul>
        <li v-for="i in usrank" class="clearfloat">
          <p class="box" :class="{ 'red':i.rank == 1, 'orange':i.rank == 2, 'yellow':i.rank == 3, 'blue':i.rank == 4 }">${{ i.box }}</p>
          <div class="usrank-img fl">
            <router-link :to="'/subject/' + i.subject.id">
              <img :src="i.subject.images.large">
            </router-link>
          </div>
          <div class="usrank-info fl">
            <p class="usrank-title">
              <router-link :to="'/subject/' + i.id">{{ i.subject.title }}({{ i.subject.year }})</router-link>
            </p>
            <p v-if="i.subject.rating.average != 0" class="usrank-star">豆瓣评分 <span>{{ i.subject.rating.average }}</span></p>
            <p v-else>暂无评分</p>
            <p>
              <span v-for="(j,index) in i.subject.genres"><span v-if="index != 0">/</span>{{ j }}</span><span v-for="j in i.subject.casts">/{{ j.name }}</span>
            </p>
            <p>{{ i.subject.collect_count }}人喜欢</p>
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
      usrank: [],
      date: ''
    }
  },
  created () {
    this.getusrank()
    document.title = '北美票房榜'
  },
  methods: {
    getusrank () {
      this.axios.get('/v2/movie/us_box')
      .then(res => {
        this.usrank = res.data.subjects
        this.date = res.data.date
      })
    }
  }
}
</script>
<style>
  .usrank{
    padding-top: 30px;
    min-height: 460px;
  }
  .usrank>h3{
    line-height: 40px;
    margin-bottom: 10px;
  }
  .date{
    color: #444;
    margin-bottom: 8px;
    font-size: 12px;
    margin-left: 10px;
  }
  .box{
    color: #555;
    font-size: 12px;
    line-height: 24px;
  }
  .red{
    color: red;
  }
  .orange{
    color: #d3421a;
  }
  .yellow{
    color: #eb891c;
  }
  .blue{
    color: blue;
  }
  .usrank li{
    margin-bottom: 26px;
  }
  .usrank-position{
    color: #888;
    width: 25px;
  }
  .usrank-img{
    width: 100px;
  }
  .usrank-info{
    line-height: 22px;
    color: #5d5d5d;
    font-size: 12px;
    padding-left: 10px;
  }
  .usrank-title{
    font-size: 14px;
  }
  .usrank-star span{
    color: #e09015;
  }
</style>