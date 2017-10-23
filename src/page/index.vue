<template>
  <div>
    <myHeader></myHeader>

    <div class="theaters content">
    <h3>正在热映</h3>
    <swiper :options="swiperOption">
      <swiper-slide v-for="i in theaters">
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
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

      <!-- <h3>正在热映</h3>
      <ul class="clearfloat">
        <li v-for="i in theaters">
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
      </ul> -->
    </div>

    <div class="coming content">
      <h3>即将上映</h3>
      <swiper :options="swiperOption2">
      <swiper-slide v-for="i in coming">
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
        <p class="hot">热度<span :class="{ blue:i.collect_count<1000, yellow:i.collect_count>=1000 && i.collect_count<5000, orange:i.collect_count>=5000 && i.collect_count<10000, red:i.collect_count>=10000 }">{{ i.collect_count }}</span></p>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    
      <!-- <ul class="clearfloat">
        <li v-for="i in coming">
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
      </ul> -->
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
      theaters: [],
      coming: [],
      swiperOption: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        autoplay: 4000,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        observeParents: true,
        spaceBetween: 40
      },
      swiperOption2: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        autoplay: 0,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        observeParents: true,
        spaceBetween: 40
      }
    }
  },
  created () {
    this.getTheaters()
    this.getComing()
    document.title = '电影'
  },
  methods: {
    getTheaters () {
      this.axios.get('/v2/movie/in_theaters?count=25')
      .then(res => {
        this.theaters = res.data.subjects
      })
    },
    getComing () {
      this.axios.get('/v2/movie/coming_soon?start=0&count=40')
      .then(res => {
        this.coming = res.data.subjects
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
  .swiper-container{
    height: 350px;
  }
  .theaters,.coming{
    padding-top: 30px;
  }
  .theaters h3,.coming h3{
    line-height: 36px;
    color: #555;
  }
  .theaters li,.coming li{
    float: left;
  }
  .theaters-img,.coming-img{
    max-width: 184px;
    max-height: 232px;
    overflow-y: hidden;
  }
  .theaters-title,.coming-title{
    margin-top: 6px;
    margin-bottom: 4px;
    color: #37a;
    text-align: center;
    max-height: 38px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .theaters-star,.coming-star{
    font-size: 12px;
    color: #5d5d5d;
    text-align: center;
  }
  .theaters-star span,.coming-star span{
    color: #e09015;
    margin-left: 5px;
  }
  .hot{
    text-align: center;
    color: #666;
    font-size: 12px;
    margin-top: 5px;
  }
  .hot span{
    margin-left: 5px;
  }
  .blue{
    color: blue;
  }
  .yellow{
    color: yellow;
  }
  .orange{
    color: orange;
  }
  .red{
    color: red;
  }
</style>
