import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Search from '@/page/search'
import Subject from '@/page/subject'
import Celebrity from '@/page/celebrity'
import Top from '@/page/top'
import Usrank from '@/page/usrank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      meta: {
        title: '主页'
      }
    }, {
      path: '/search/:keyword',
      component: Search,
      meta: {
        title: '搜索结果'
      }
    }, {
      path: '/subject/:id',
      component: Subject
    },
    {
      path: '/celebrity/:id',
      component: Celebrity
    }, {
      path: '/top',
      component: Top
    }, {
      path: '/us_rank',
      component: Usrank
    }
  ]
})
