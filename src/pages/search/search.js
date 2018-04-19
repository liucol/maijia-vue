// 加载样式文件
import 'css/common.css'
import './search.css'

import Vue from "vue"
import axios from "axios"
import url from "js/api.js"
import qs from "qs"

import mixin from "js/mixin.js"

/*懒加载UI组件*/
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import Volecity from 'velocity-animate'

//解构赋值
//let {keyword,id} =qs.parse(location.search.Substr(1))

let urlObj = qs.parse(location.search.substr(1))

new Vue({
    el:'.container',
    data:{
       SearchList: null,
    //    loading: false,   //false: 循环加载被触发    true: 循环不被触发
    //    allLoaded: true,   //全部加载完毕  false :  没有全部加载完    true : 全部加载完毕
       keyword: urlObj.keyword,
       gotop: false
    },
    created(){
        this.getSearchList()
    },
    methods:{
       getSearchList(){
           
           this.loading = true

           axios.post(url.searchList,urlObj).then(res=>{
               var curList = res.data.lists

               this.SearchList = curList

            //    if(this.SearchList){
            //        this.SearchList = this.SearchList.concat(curList)
            //    }else{
            //        this.SearchList = curList
            //    }
            //    this.loading = false
           })
       },
       move(){
           if(document.body.scrollTop > 50){
                this.gotop = true
           }
       },
       gotoTop(){
        //    document.body.scrollTop = 0
           Volecity(document.body,'scroll',{duration: 1000})
           this.gotop = false
       }
    },
    mixins: [mixin]
})