<template>
  <div>
    <myHeader></myHeader>

     <div class="usrank" v-if="usrank.length > 0">
      <h4>北美票房排行榜</h4>
      <ul>
        <li v-for="i in usrank">
          <router-link :to="'/subject/' + i.subject.id">
            <div class="theaters-img">
              <img :src="i.subject.images.large">
            </div>
          </router-link>
          <router-link :to="'/subject/' + i.subject.id">
            <p class="theaters-title">
              {{ i.subject.title }}
            </p>
          </router-link>
          <p v-if="i.subject.rating.average != 0" class="theaters-star">豆瓣评分：
            <span>{{ i.subject.rating.average }}</span></p>
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
      usrank: []
    }
  },
  created () {
    this.getTop()
  },
  methods: {
    getTop () {
      this.axios.get('/v2/movie/us_box')
      .then(res => {
        this.usrank = res.data.subjects
      })
    }
  }
}
</script>