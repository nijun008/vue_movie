<template>
  <div>
    <myHeader></myHeader>
    <div class="subject content">
      <h2>{{ subject.title }}<span>({{ subject.year }})</span></h2>
      <div v-if="subject.rating" class="subject-box clearfloat">
        <div class="subject-img fl">
          <img v-if="subject.images" :src="subject.images.large">
        </div>
        <div class="subject-info fl">
          <p>导演：
            <template v-for="(i,index) in subject.directors">
              <span v-if="index != 0"> /</span>
              <router-link :to="'/celebrity/' + i.id">{{ i.name }}</router-link>
            </template>
          </p>
          <p>主演：
            <template v-for="(i,index) in subject.casts">
              <span v-if="index != 0"> /</span>
              <router-link :to="'/celebrity/' + i.id">{{ i.name }}</router-link>
            </template>
          </p>
          <p>类型：
            <template v-for="(i,index) in subject.genres">
              <span v-if="index != 0"> /</span>
              <span>{{ i }}</span>
            </template>
          </p>
          <p>国家/地区：
            <span v-for="(i,index) in subject.countries">
              <span v-if="index != 0"> /</span>
              {{ i }}
            </span>
          </p>
          <p v-if="subject.aka.length > 0">又名：
            <span v-for="(i,index) in subject.aka">
              <span v-if="index != 0"> /</span>
              {{ i }}
            </span>
          </p>
          <p v-if="subject.rating.average != 0">豆瓣评分：<span>{{ subject.rating.average }}</span></p>
          <p v-else>暂无评分</p>
        </div>
      </div>
      <div class="summary-box">
          <h4>{{ subject.title }}剧情介绍</h4>
          <p>{{ subject.summary }}</p>
        </div>
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
      subject: {},
      comments: {}
    }
  },
  created () {
    this.getSubject()
  },
  methods: {
    getSubject () {
      this.axios.get('/v2/movie/subject/' + this.id)
      .then(res => {
        this.subject = res.data
      })
    }
  }
}
</script>
<style>
  .subject{
    padding: 40px 0;
  }
  .subject>h2{
    color: #444;
    margin-bottom: 10px;
  }
  .subject>h2>span{
    color: #999;
    margin-left: 10px;
  }
  .subject-box{

  }
  .subject-img{
    width: 30%;
  }
  .subject-info{
    padding-left: 2%;
    width: 70%;
    line-height: 22px;
    color: #666;
  }
  .subject-info span{
    color: #222;
  }
  .summary-box{
    margin-top: 20px;
    clear: both;
    line-height: 22px;
  }
  .summary-box h4{
    color: #007722;
  }
  .summary-box p{
    color: #444;
  }
</style>