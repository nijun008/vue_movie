<template>
  <div>
    <myHeader></myHeader>

    <div class="theaters content">
      <h3>正在热映</h3>
      <ul class="clearfloat">
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

    <div class="coming content">
      <h3>即将上映</h3>
      <ul class="clearfloat">
        <li v-for="i in alldata.coming">
          <div class="coming-img">
            <router-link :to="'/subject/' + i.id">
              <img :src="i.images.large">
            </router-link>
          </div>
          <p class="coming-title">
            <router-link :to="'/subject/' + i.id">
              {{ i.title }}
            </router-link>
          </p>
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
<style>
  .theaters,.coming{
    padding-top: 30px;
  }
  .theaters h3,.coming h3{
    line-height: 26px;
  }
  .theaters li,.coming li{
    float: left;
    margin: 13px;
  }
  .theaters-img,.coming-img{
    width: 140px;
    height: 190px;
    overflow-y: hidden;
  }
  .theaters-title,.coming-title{
    margin-top: 6px;
    margin-bottom: 4px;
    color: #37a;
  }
  .theaters-star,.coming-star{
    font-size: 12px;
    color: #6d6d6d;
  }
  .theaters-star span,.coming-star span{
    color: #e09015;
    margin-left: 5px;
  }
</style>