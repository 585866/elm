<template>
   <div class="shopcart">
     <div class="content">
       <div class="content-left">
         <div class="logo-wrapper">
           <div class="logo" :class="{'highlight':totalCount>0}">
             <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
           </div>
           <div class="num" v-show="totalCount>0">{{totalCount}}</div>
         </div>
         <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
         <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
       </div>
       <div class="content-right" @click.stop.prevent="pay">
         <div class="pay" :class="payClass">
           {{payDesc}}
         </div>
       </div>
     </div>
     <div class="ball-container">
       <div v-for="ball in balls" :key="ball.id">
         <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
           <div v-show="ball.show" class="ball">
             <div class="inner inner-hook"></div>
           </div>
         </transition>
       </div>
     </div>
   </div>

</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartcontrol/cartcontrol';
    export default {
     data(){
       return{
         balls: [
           {
           show: false
         },
           {
             show: false
           },
           {
             show: false
           },
           {
             show: false
           },
           {
             show: false
           }
           ],
         dropBalls: [],
         fold: true,
         food:{
           type:Object
         }
       }
     },
      methods: {
        drop(el) {
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if (!ball.show) {
              ball.show = true;
              ball.el = el;
              this.dropBalls.push(ball);
              return;
            }
          }
        },
        beforeEnter(el) {
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect();
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22);
              el.style.display = '';
              el.style.webkitTransform = `translate3d(0, ${y}px,0)`;
              el.style.transform = `translate3d(0, ${y}px,0)`;
              let inner = el.getElementsByClassName("inner-hook")[0];
              inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            }
          }
        },
        enter(el) {
          let rf = el.offsetHeight;
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0, 0, 0)';
            el.style.transform = 'translate3d(0, 0, 0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0, 0, 0)';
            inner.style.transform = 'translate3d(0, 0, 0)';
          });
        },
        afterEnter(el) {
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          }
	}
        },
      props:{
        selectFoods:{
          type:Array,
          default(){
            return[
              {
                price:30,
                count:2
              }
            ]
          }
        },
        deliveryPrice:{
          type:Number,
          default:0
        },
        minPrice:{
          type:Number,
          default:0
        },
        food:{
          type:Object
        }
      },
      computed:{
        totalPrice(){
          let total=0
          this.selectFoods.forEach((food)=>{
            total +=food.price*food.count
          })
          return total
        },
        totalCount(){
          let count=0;
          this.selectFoods.forEach((food)=>{
            count+=food.count;
          });
          return count;
        },
        payDesc(){
          if(this.totalPrice===0){
            return `￥${this.minPrice}元起送`
          }else if(this.totalPrice<this.minPrice){
            let diff=this.minPrice-this.totalPrice
            return `还差￥${diff}元起送`
          }else {
            return `去结算`
          }
        },
        payClass(){
          if(this.totalPrice<this.minPrice){
            return 'not-enough'
          }else{
            return 'enough'
          }
        }
      },
      components:{
       cartcontrol
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/icon.css";
  .shopcart
    position:fixed
    left:0
    bottom:0
    z-index:50
    width: 100%
    height:48px
    .list-mask
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index 40 //z-index要小于shopcart的index
      backdrop-filter blur(10px)
      -webkit-backdrop-filter blur(10px)
      opacity 1
      background rgba(7, 17, 27, 0.6)
      &.fade-enter-active, &.fade-leave-active
        opacity 1
        transition: all 0.5s //设置缓动效果
        background rgba(7, 17, 27, 0.6)
      &.fade-enter, &.fade-leave-active
        opacity 0
        background rgba(7, 17, 27, 0)
    .content
      display:flex
      background: #141d27
      font-size:0
      .content-left
        flex:1
        .logo-wrapper
          display:inline-block
          position:relative
          top: -10px
          margin:0 12px
          padding:6px
          width:56px
          height:56px
          box-sizing border-box
          vertical-align:top
          border-radius :50%
          background:#141d27
          .logo
            width: 100%
            height: 100%
            border-radius :50%
            background:#2b343c
            text-align :center
            &.highlight
              background:rgb(0,160,220)
            .icon-shopping_cart
              font-size:24px
              line-height:44px
              color:#80858a
              &.highlight
                color:#fff
           .num
             position:absolute
             top:0
             right:0
             width:24px
             height:16px
             line-height:16px
             text-align :center
             border-radius :50px
             font-size:9px
             font-weight :700
             color: #ffffff
             background:rgb(240,20,20)
             box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display inline-block
          vertical-align :top
          line-height:24px
          margin-top:12px
          box-sizing :border-box
          padding-right:12px
          border-right:1px solid rgba(255,255,255,0.1)
          font-size:16px
          font-weight :700
          color:rgba(255,255,255,0.4)
          &.highlight
            color:#fff
        .desc
          display inline-block
          vertical-align :top
          line-height:24px
          margin:12px 0 0 12px
          font-size:10px
          font-weight:700
          color:rgba(255,255,255,0.4)
      .content-right
        flex:0 0 105px
        width:105px
        .pay
          height:48px
          line-height:48px
          text-align:center
          font-size:12px
          color:rgba(255,255,255,0.4)
          font-weight:700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color:#fff



      
      .ball-container
        .ball
          position:fixed
          left:32px
          bottom:22px
          z-index:200
          transition:all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
          .inner
            width:16px
            height:16px
            border-radius:50%
            background-color:rgb(0,160,220)
            transition:all 0.4s linear


</style>
