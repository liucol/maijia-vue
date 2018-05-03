// 加载样式文件
import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Mock from 'mockjs';
let Random = Mock.Random

let data = Mock.mock({
     'cartList|3':[{
         'goodsList|1-2' : [{
             id: Random.int(10000,100000),
             image: Mock.mock('@img(90x90,@color)')
         }]
     }]
})

console.log(data)
