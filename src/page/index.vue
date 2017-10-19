<template>
  <div>
    <myHeader></myHeader>

    <div class="theaters">
      <h4>正在热映</h4>
      <ul>
        <li v-for="i in alldata.theaters">
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
          <p class="theaters-star" v-html="returnStar(i.rating.average)"></p>
        </li>
      </ul>
    </div>

    <div class="coming">
      <h3>即将上映</h3>
      <ul>
        <li v-for="i in alldata.coming">
          <router-link :to="'/subject/' + i.id">
            <div class="coming-img">
              <img :src="i.images.large">
            </div>
          </router-link>
          <router-link :to="'/subject/' + i.id">
            <p class="coming-title">
              {{ i.title }}
            </p>
          </router-link>
          <p class="coming-star" v-html="returnStar(i.rating.average)"></p>
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
      alldata: {
        theaters: [],
        coming: []
      }
    }
  },
  created () {
    this.getTheaters()
    this.getComing()
  },
  methods: {
    getTheaters () {
      this.axios.get('/v2/movie/in_theaters')
      .then(res => {
        this.alldata.theaters = res.data.subjects
      })
    },
    getComing () {
      this.axios.get('/v2/movie/coming_soon')
      .then(res => {
        this.alldata.coming = res.data.subjects
      })
    },
    returnStar (star) {
      if (star === 0) {
        return '暂无评分'
      } else {
        return '豆瓣评分<span>' + star + '</span>'
      }
    }
  }
}
</script>