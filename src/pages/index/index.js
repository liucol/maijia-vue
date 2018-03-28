/**
 * Created by User on 2018/3/27.
 */
import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

/*懒加载UI组件*/
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import Foot from "components/Foot.vue"

let app = new Vue({
  el:"#app",
  data:{
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading:false,   //false: 循环加载被触发    true: 循环不被触发
    allLoaded:false   //全部加载完毕  false :  没有全部加载完    true : 全部加载完毕
  },
  created(){
    this.getLists()
  },
  methods:{
    getLists(){
      this.loading = true   //上次加载没有完成的时候 取消再次加载
      if(this.allLoaded) return
      axios.post(url.hotLists,{
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res=>{
        var curList = res.data.lists
        //如果当前请求过来的数据小于6  那么就是最后一页或最最后一页   说明再下一页就一定没有数据了
        if(curList.length < this.pageSize){
            this.allLoaded = true
        }
        if(this.lists){
            this.lists = this.lists.concat(curList)
        }else{
            this.lists = res.data.lists
        }
        this.pageNum++
        this.loading = false   //恢复数据加载
      })
    }
  },
  components:{
    Foot
  }
})
