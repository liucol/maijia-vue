import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin.js'
import qs from 'qs'
import Swipe from 'components/Swipe.vue'
 
let id = qs.parse(location.search.substr(1))

let detailTab = ['商品详情','本店成交']

new Vue({
    el: '#app',
    data:{
        id: id,
        details: null,
        detailTab,
        Tabindex: 0,
        dealLists: null,
        bannerList: null,
        skuType: 1,
        showSku: false,
        skuNum: 1,
        isAddCart: false,
        showAddMessage: false
    },
    created(){
        this.getDetails()
    },
    methods:{
        getDetails(){
            axios.post(url.details,{id: id}).then(res=>{
                this.details = res.data.data
                // 轮播数组对象  共用一个组件 需要传入固定的数据格式  但是这里只有image   =>  构造数据
                this.bannerList = []
                this.details.imgs.forEach(item=>{
                    this.bannerList.push({
                        clickUrl: '',
                        image: item
                    })
                })
            })
        },
        changeTab(index){
            this.Tabindex = index
            if(index == 1){
                this.getDeal()
            }
        },
        getDeal(){
            axios.post(url.deal,{id: id}).then(res=>{
                this.dealLists = res.data.data.lists
            })
        },
        chooseSku(type){
            this.skuType = type
            this.showSku = true
        },
        changeNum(num){
            if(num< 0 && this.skuNum == 1){
                  return
            }
            this.skuNum += num 
        },
        addCart(){
            axios.post(url.addcart,{
                id: id,
                number: this.skuNum
            }).then(res=>{
                if(res.data.status === 200){
                    this.showSku = false
                    this.isAddCart = true
                    this.showAddMessage = true
                    
                    console.log("是你吗")
                    setTimeout(function(){
                        this.showAddMessage = false
                    }, 1000)
                }
            })
        }
    },
    watch:{
        showSku(val,oldVal){
            document.body.style.overflow = val ? 'hidden' : 'auto'
            document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
            document.body.style.height = val ? '100%' : 'auto'
            document.querySelector('html').style.height = val ? '100%' : 'auto'
        }
    },
    components: {
        Swipe
    },
    mixins: [mixin]
})