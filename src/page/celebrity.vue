<template>
  <div>
    <myHeader></myHeader>
    <div class="celebrity content" v-if="celebrity.name">
      <h3>{{ celebrity.name }} {{ celebrity.name_en }}</h3>
      <div class="celebrity-box clearfloat">
        <div class="celebrity-img">
          <img :src="celebrity.avatars.large" onerror="this.src='http://i1.bvimg.com/588469/9dc16a40f9826acc.png'">
        </div>
        <div class="celebrity-info">
          <p>性别：<span>{{ celebrity.gender }}</span></p>
          <p>出生地：<span>{{ celebrity.born_place }}</span></p>
          <p>职业：
            <span v-for="(i,index) in celebrity.works">
              <span v-if="index != 0">/</span>{{ i.roles[0] }}
            </span>
          </p>
          <p v-if="celebrity.aka.length > 0">别名：
            <span v-for="(i,index) in celebrity.aka">
              <span v-if="index != 0">/</span>{{ i }}
            </span>
          </p>
          <p>
            <a :href="celebrity.alt" target="_blank">更多信息</a>
          </p>
        </div>
      </div>
      <ul class="works-list clearfloat">
        <h3>作品</h3>
        <li v-for="i in celebrity.works" class="clearfloat">
          <div class="works-img">
            <router-link :to="'/subject/' + i.subject.id">
              <img :src="i.subject.images.large" onerror="this.src='http://i1.bvimg.com/588469/9dc16a40f9826acc.png'">
            </router-link>
          </div>
          <div>
            <router-link :to="'/subject/' + i.subject.id">
              <p class="works-title">
                {{ i.subject.title }}
              </p>
            </router-link>
            <p class="works-star" v-if="i.subject.rating.average != 0">
              豆瓣评分 <span>{{ i.subject.rating.average }}</span>
            </p>
            <p v-else>暂无评分</p>
            <p>{{ i.subject.year }}</p>
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
      id: this.$route.params.id,
      celebrity: {}
    }
  },
  created () {
    this.getCelebrity()
    document.title = '电影人'
  },
  methods: {
    getCelebrity () {
      this.axios.get('v2/movie/celebrity/' + this.id)
      .then(res => {
        this.celebrity = res.data
        document.title = '电影人-' + this.celebrity.name
      })
    }
  }
}
</script>
<style>
  .celebrity{
    padding-top: 30px;
  }
  .celebrity h3{
    line-height: 40px;
    color: #555;
  }
  .celebrity-img{
    float: left;
    width: 30%;
  }
  .celebrity-info{
    float: left;
    width: 70%;
    padding-left: 20px;
    color: #4d4d4d;
    line-height: 22px;
  }
  .works-list{
    margin-top: 50px;
    line-height: 22px;
  }
  .works-list li{
    margin-bottom: 20px;
    float: left;
    margin: 20px;
    color: #6d6d6d;
  }
  .works-img{
    width: 160px;
    height: 224px;
    overflow: hidden;
    margin-bottom: 8px;
  }
  .works-star span{
    color: #e09015;
  }
</style>
