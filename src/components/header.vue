<template>
  <header>
    <div class="content">
      <div class="clearfloat wrap-search">
        <div class="logo fl"><router-link :to="'/'">电影</router-link></div>
        <div class="search-box clearfloat fl">
          <input type="text" v-model="keyword" :placeholder="keyword ? keyword : '电影、电影人'">
          <button @click="search">搜索</button>
        </div>
      </div>
      <ul class="nav clearfloat">
        <li style="width: 30%;height: 1px;margin-right: 0"></li>
        <li><router-link :to="'/top'">Top250</router-link></li>
        <li><router-link :to="'/us_rank'">北美票房榜</router-link></li>
      </ul>
    </div>
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
  header{
    background-color: #f0f3f5;
    padding-top: 40px;
    padding-bottom: 30px;
  }
  .wrap-search{
    width: 60%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    min-width: 300px;
  }
  .logo{
    line-height: 34px;
    font-size: 26px;
    width: 30%;
    text-align: right;
    padding-right: 10px;
    color: #1c88cb;
  }
  .search-box{
    width: 70%;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 2px 2px 2px #666;
  }
  .search-box input{
    float: left;
    line-height: 34px;
    outline: none;
    padding-left: 10px;
    border: none;
    width: 70%;
    color: #505050;
  }
  .search-box button{
    float: left;
    line-height: 34px;
    border: none;
    width: 30%;
    cursor: pointer;
    background-color: #9099a1;
    color: #fff;
    outline: none;
    letter-spacing: 3px;
    font-size: 16px;
  }
  .nav{
    padding-top: 14px;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    min-width: 300px;
  }
  .nav li{
    float: left;
    margin-right: 16px;
  }
</style>