<template>
  <div>
    <myHeader></myHeader>
    <div class="celebrity" v-if="celebrity.name">
      <h3>{{ celebrity.name }} {{ celebrity.name_en }}</h3>
      <div class="celebrity-box">
        <div class="celebrity-img">
          <img :src="celebrity.avatars.large">
        </div>
        <div class="celebrity-info">
          <p>性别：<span>{{ celebrity.gender }}</span></p>
          <p>出生地：<span>{{ celebrity.born_place }}</span></p>
          <p>职业：
            <span v-for="(i,index) in celebrity.works">
              <span v-if="index != 0">/</span>{{ i.roles[0] }}
            </span>
          </p>
          <p>别名：
            <span v-for="(i,index) in celebrity.aka">
              <span v-if="index != 0">/</span>{{ i }}
            </span>
          </p>
        </div>
      </div>
      <ul>
        <li v-for="i in celebrity.works">
          <router-link :to="'/subject/' + i.subject.id">
            <div class="works-star-img">
              <img :src="i.subject.images.large">
            </div>
          </router-link>
          <router-link :to="'/subject/' + i.subject.id">
            <p class="works-star-title">
              {{ i.subject.title }}
            </p>
          </router-link>
          <p class="works-star" v-if="i.subject.rating.average != 0">
            豆瓣评分 <span>{{ i.subject.rating.average }}</span>
          </p>
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
      id: this.$route.params.id,
      celebrity: {}
    }
  },
  created () {
    this.getCelebrity()
  },
  methods: {
    getCelebrity () {
      this.axios.get('v2/movie/celebrity/' + this.id)
      .then(res => {
        this.celebrity = res.data
        console.log(this.celebrity)
      })
    }
  }
}
</script>