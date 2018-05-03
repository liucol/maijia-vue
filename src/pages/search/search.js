// 加载样式文件
import 'css/common.css'
import './search.css'

import Vue from "vue"
import axios from "axios"
import url from "js/api.js"
import qs from "qs"
import $ from "jquery"

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
       loads: false,  //是否加载数据
       loaded: false,  //所有数据是否加载完毕
       addlist: false,  //是否正在加载数据
       keyword: urlObj.keyword,
       gotop: false
    },
    created(){
        this.getSearchList()
    },
    mounted() {
        $(window).on("scroll",this.scrollfn)
    },
    methods:{
       getSearchList(){
           
           if(this.addlist){
                return
           }
           this.addlist = true

           axios.post(url.searchList,urlObj).then(res=>{
               var curList = res.data.lists
               if(curList.length == 0){
                   this.loaded = true 
               }

               if(this.SearchList){
                   this.SearchList = this.SearchList.concat(curList)
               }else{
                   this.SearchList = curList
               }

               this.addlist = false
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
       },
       scrollfn(){
            var $load = $(".loading-more").eq(0)
            //滚动高度
            var scrollTop = $(window).scrollTop(),
            //窗口高度+滚动高度（元素刚好要进入窗口）
                s_rTop = $(window).height()+scrollTop,
            //元素到文档顶部高度
                offsetTop= $load.offset().top,
            //元素底部刚好出窗口上边（元素刚好要离开窗口）
                e_rTop = offsetTop+$load.outerHeight()

            if(offsetTop<s_rTop&&scrollTop<e_rTop){
                this.loads = true
                this.getSearchList()
            }else{
                this.loads = false
            }
       }
    },
    mixins: [mixin]
})