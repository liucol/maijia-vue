// 加载样式文件
import 'css/common.css'
import './category.css'

import Vue from 'vue'
// 异步请求
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot.vue'

new Vue({
   el:'#app',
   data:{
     topLists: null,
     topIndex: 0,
     subData: null,
     rankData: null
   },
   created(){
     this.getTopList()
     this.getSubList(0,0)
   },
   methods:{
       getTopList(){
           axios.post(url.topList).then(res=>{
              this.topLists = res.data.lists
           }).catch(res=>{

           })
       },
       getSubList(index,id){
           this.topIndex = index
           if(index === 0){
                this.getRank()
           }else{
                axios.post(url.subList,{id}).then(res=>{
                    this.subData = res.data.data
                })
           }
        //    this.getRank()
        //    axios.post(url.subList,{id}).then(res=>{
        //         this.subData = res.data.data
        //     })
           
       },
       getRank(){
            axios.post(url.rank).then(res=>{
                this.rankData = res.data.data
            })
       }
   },
   components:{
       Foot
   },
   //过滤器
   filters:{
       number(price){
          return price+".00"
       }
   }
})