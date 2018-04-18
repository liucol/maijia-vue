// 加载样式文件
import 'css/common.css'
import './search.css'

import Vue from "vue"
import axios from "axios"
import url from "js/api.js"
import qs from "qs"

import mixin from "js/mixin.js"

//解构赋值
//let {keyword,id} =qs.parse(location.search.Substr(1))

let urlObj = qs.parse(location.search.substr(1))

new Vue({
    el:'.container',
    data:{
       SearchList: null,
       keyword: urlObj.keyword,
       gotop: false
    },
    created(){
        this.getSearchList()
    },
    methods:{
       getSearchList(){
           axios.post(url.searchList,urlObj).then(res=>{
                 this.SearchList = res.data.lists
           })
       },
       move(){
           if(document.body.scrollTop > 50){
                this.gotop = true
           }
       },
       gotoTop(){
           document.body.scrollTop = 0
           this.gotop = false
       }
    },
    mixins: [mixin]
})