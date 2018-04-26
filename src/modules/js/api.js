/**
 * Created by User on 2018/3/27.
 */
// let url = {
//    hotLists: '/getgoodsmessage',
//    banner: '/index/banner',
//    topList: '/category/topList',
//    subList:'/category/subList',
//    rank: '/category/rank'
// }
let url ={
  hotLists:'/index/hotList',
  banner: '/index/banner',
  topList: '/category/topList',
  subList: '/category/subList',
  rank: '/category/rank',
  searchList: '/search/list',
  details: '/goods/details',
  deal: '/goods/deal',
  addcart: '/cart/add'
}

//开发环境和真实环境的切换
/*let  host = ''*/  /* 'http://rapapi.org/mockjsdata/23334'*/ 
// let  host = 'http://rapapi.org/mockjsdata/32667'

let  host = 'http://rapapi.org/mockjsdata/24170'

for(let  key in url){
  if(url.hasOwnProperty(key)){
      url[key] = host + url[key]
  }
}

export default url
