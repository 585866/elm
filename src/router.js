import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
//1:引入自定义组件
import goods from "./components/goods/goods";
import ratings from "./components/ratings/ratings"
import seller from "./components/seller/seller"
import shopcart from "./components/shopcart/shopcart"
import cartcontrol from "./components/cartcontrol/cartcontrol"
import food from "./components/food/food"
import split from "./components/split/split"
import ratingselect from "./components/ratingselect/ratingselect"
Vue.use(Router)
//2:配置访问自定义组件路径
//   {path访问路径 component  组件名称}
export default new Router({
  routes: [
    {path:"/goods",component:goods},
    {path:"/ratings",component:ratings},
    {path:"/seller",component:seller},
    {path:"/shopcart",component:shopcart},
    {path:"/cartcontrol",component:cartcontrol},
    {path:"/food",component:food},
    {path:"/split",component:split},
    {path:"/ratingselect",component:ratingselect},
  ]
})
