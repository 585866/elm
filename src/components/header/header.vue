<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img width="64" height="64" :src="seller.avatar" alt="">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="support">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div v-if="seller.supports" class="support-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bulletin-wrapper">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
        <img :src="seller.avatar" width="100%" height="100%" alt="">
      </div>
      <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>

      </div>
      </transition>
    </div>
</template>
<script>
  import star from "../../components/stars/star";
    export default{
      data() {
        return{
          detailShow:false
        }
      },
      props:{
        seller:{
          type:Object
        }
      },
      methods:{
        showDetail(){
          this.detailShow=true
        },
        hideDetail(){
          this.detailShow=false
        }
      },
      created(){
        this.classMap=["decrease","discount","special","invoice","guarantee"]
      },
      components:{
        star:star
      },
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/icon.css";
  @import "../../common/style/base.css";
  .header
    color:#fff
    position:relative
    background:rgba(7, 17, 27, 0.3)
    overflow:hidden
    .content-wrapper
      padding: 24px 12px 18px 24px
      font-size:0
      position:relative
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius :2px
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0 8px 0
          font-size: 16px
          .brand
            width: 30px
            height: 18px
            display: inline-block
            background-image: url("img/brand@2x.png")
            background-repeat :no-repeat
            background-size: 30px 18px
            vertical-align: top
          .name
            margin-left: 6px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            vertical-align: top
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              background-image: url("img/decrease_1@2x.png")
            &.discount
              background-image: url("img/discount_1@2x.png")
            &.guarantee
              background-image: url("img/guarantee_1@2x.png")
            &.invoice
              background-image:url("img/invoice_1@2x.png")
            &.special
              background-image: url("img/special_1@2x.png")
          .text
            line-height:12px;
            font-size:10px
      .support-count
        position:absolute
        right:12px
        bottom:14px
        padding:0 8px
        height:24px
        line-height:24px
        border-radius: 14px
        background:rgba(0,0,0,0.2)
        text-align: center
        .count
          font-size:10px
          vertical-align: top
        .icon-keyboard_arrow_right
          font-size:10px
          line-height:24px
          margin-left:2px
    .bulletin-wrapper
      height:28px
      line-height:28px
      padding:0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      position:relative
      background:rgba(7,17,27,0.2)
      .bulletin-title
        display:inline-block
        width:22px
        height:12px
        background-image:url("img/bulletin@2x.png")
        background-repeat no-repeat
        background-size:22px 12px
        margin-top:8px
      .bulletin-text
        margin:0 4px
        font-size:10px
        vertical-align: top
      .icon-keyboard_arrow_right
        font-size:10px
        position:absolute
        right:6px
        top:9px
    .background
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px)
    .detail
      position:fixed
      top:0
      left:0
      z-index:100
      width:100%
      height:100%
      overflow: auto
      background:rgba(7,17,27,0.8)
      -webkit-backdrop-filter: blur(10px)
      transition:all 0.5s
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
      .detail-wrapper
        min-height:100%
        width:100%
        .detail-main
          margin-top:64px
          padding-bottom:64px
          .name
            line-height:16px
            text-align:center
            font-size:16px
            font-weight:700
          .star-wrapper
            margin-top:18px
            padding:2px 0
            text-align: center
          .title
            display:flex;
            width:80%;
            margin:30px auto 24px auto
            .line
              flex:1;
              position:relative;
              top:-6px;
              border-bottom:1px solid rgba(255,255,255,0.2)
          .text
            padding:0 12px
            font-size:14px
            font-weight:700
          .supports
            width:80%
            margin:0 auto
            .support-item
              padding:0 12px
              margin-bottom:12px
              font-size:0
              &:last-child
                margin-bottom:0
              .icon
                display:inline-block
                width:16px
                height:16px
                vertical-align: top
                margin-right:6px
                background-size:16px 16px
                background-repeat: no-repeat
                &.decrease
                  background-image: url("img/decrease_1@2x.png")
                &.discount
                  background-image: url("img/discount_1@2x.png")
                &.guarantee
                  background-image: url("img/guarantee_1@2x.png")
                &.invoice
                  background-image:url("img/invoice_1@2x.png")
                &.special
                  background-image: url("img/special_1@2x.png")
              .text
                line-height:16px
                font-size:12px
          .bulletin
            width:80%;
            margin:0 auto
            .content
              padding:0 12px;
              line-height:24px;
              font-size:12px
      .detail-close
        position:relative
        width:32px
        height:32px
        margin:-64px auto 0 auto
        clear:both
        font-size:32px









</style>
