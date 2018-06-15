//加载样式文件
import './cart_base.css'
import './cart_trade.css'
import './cart.css'


//手动mock数据
// import Mock from 'mockjs'
// let Random =Mock.Random

// let data = Mock.mock({
//     'cartList|3':[{
//            'shopTitle|1': ["海威森林","大点小店","夏季","五颜六色"],
//            'goodsList|1-2' :[{
//                 id: Random.int(10000,100000),
//                'title|1': ["裙子","啦啦","笑笑","四季"],
//                'sku|1': ["新款裙子","最受欢迎的店","你会喜欢的","大胡子叔叔"],
//                'image|1': ['@img(90x90,@color)','@img(90x90,@color)','@img(90x90,@color)'],
//                'number|1-10': 1,
//                'price|1-500': 1
//            }]
//         }]
// })

// console.log("得到mock的数据")
// console.log(data.cartList)


 import Vue from 'vue'
 import mixin from 'js/mixin.js'
 import axios from 'axios'
 import url from 'js/api.js'

new Vue({
    el: '.container',
    data:{
       lists: null,
       total: 0,
       editingShop: null,
       editingShopIndex: -1
    },
    computed: {
       allSelected: {
           get() {
               if(this.lists && this.lists.length){
                   return  this.lists.every(shop => {
                        return shop.checked
                    })
               }
                return false
           },
           set(newVal) {
               this.lists.forEach(shop => {
                   shop.checked = newVal
                   shop.goodsList.forEach(good => {
                       good.checked = newVal
                   })
               })
           }
       },
       selectLists() {
           let arr = [],
               total = 0
           if(this.lists && this.lists.length){
               this.lists.forEach(shop => {
                   shop.goodsList.forEach(good => {
                       if(good.checked){
                        arr.push(good)
                        total += good.price * good.number
                       }
                   })
               })
               this.total = total
               return arr
           }
           return []
       },
       removelist(){

       }
    },
    created(){
       this.getList()
    },
    methods: {
       getList() {
        axios.post(url.cartLists).then(res => {
            let lists = res.data.cartList

            lists.forEach(shop => {
                shop.checked = true
                shop.removeChecked = false
                shop.editing = false
                shop.editingMsg = "编辑"
                shop.goodsList.forEach(good => {
                     good.checked = true
                     good.removeChecked = false
                })
            });

            this.lists = lists
        })
       },
       selected(shop,good){
           good.checked = !good.checked
           shop.checked = shop.goodsList.every(good => {
               return good.checked
           })
       },
       shopSelected(shop){
        shop.checked = !shop.checked
        shop.goodsList.forEach(good => {
            good.checked = shop.checked
        })
       },
       allgoodsSelected(){
           this.allSelected = !this.allSelected
       },
       edit(shop,shopIndex){
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing? "完成" : "编辑"
            this.lists.forEach((item,i)=>{
                if(i !== shopIndex){
                    //item.editing = false
                    item.editingMsg = shop.editing? "" : "编辑"
                }
            })
            this.editingShop =  shop.editing? shop : null
            this.editingShopIndex = shop.editing? shopIndex : -1
       }
    },
    mixins: [mixin]
})
