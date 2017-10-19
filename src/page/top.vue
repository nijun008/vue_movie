<template>
  <div>
    <myHeader></myHeader>

     <div class="top">
      <h4>Top 250</h4>
      <ul>
        <li v-for="i in top">
          <router-link :to="'/subject/' + i.id">
            <div class="top-img">
              <img :src="i.images.large">
            </div>
          </router-link>
          <router-link :to="'/subject/' + i.id">
            <p class="top-title">
              {{ i.title }}
            </p>
          </router-link>
          <p class="top-star">豆瓣评分 <span>{{ i.rating.average }}</span></p>
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
      top: []
    }
  },
  created () {
    this.getTop()
  },
  methods: {
    getTop () {
      this.axios.get('/v2/movie/top250')
      .then(res => {
        this.top = res.data.subjects
      })
    }
  }
}
</script>