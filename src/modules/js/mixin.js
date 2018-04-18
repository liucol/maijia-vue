import Foot from 'components/Foot.vue'

let mixin = {
    filters:{
        currency(price){ 
            let priceStr = '' + price  //数字类型转换成字符串
            //判断有无小数点
            if(priceStr.indexOf('.')>-1){
                let arr = priceStr.split('.')  //小数点分隔成两个值
                return arr[0]+'.'+(arr[1]+'0').substr(0,2)  //arr[0]不变   arr[1]至少以为 那么添加以为再切割两位作为小数点后两位数
            }else{
                return priceStr + '.00'
            }
        }
    },
    components:{
        Foot
    }
}

export default mixin
