<template>
  <header>
    <input type="" name="" v-model="keyword">
    <button @click="search">搜索</button>
    <ul class="nav">
      <li><router-link :to="'/'">首页</router-link></li>
      <li><router-link :to="'/top'">Top 250</router-link></li>
      <li><router-link :to="'/us_rank'">北美票房排行榜</router-link></li>
    </ul>
  </header>
</template>
<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    search () {
      if (this.keyword) {
        this.$router.push('/search/' + this.keyword)
        this.$emit('searchevent', this.keyword)
      } else {
        alert('请输入关键词!')
      }
    }
  }
}
</script>
<style>
  
</style>