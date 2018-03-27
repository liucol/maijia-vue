/**
 * Created by User on 2018/3/27.
 */
import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

let app = new Vue({
  el:"#app",
  data:{
    lists: null,
    pageNum: 1,
    loading:false,
    allLoaded:false
  },
  created(){
    this.getLists()
  },
  methods:{
    getLists(){
      this.loading = true   //上次加载没要完成的时候 取消再次加载
      axios.post(url.hotLists,{
        pageNum: this.pageNum,
        pageSize: 6
      }).then(res=>{
        var curList = res.data.lists
        if(this.lists){
          this.lists = this.lists.concat(curList)
        }else{
          this.lists = res.data.lists
        }
        this.loading = false   //恢复数据加载
      })
    }
  }
})
