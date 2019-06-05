<template>
  <div id="app" @touchmove.prevent>
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
  import qs from 'query-string'
  import { getSeller } from 'api'
  import VHeader from 'components/v-header/v-header'
  import Goods from 'components/goods/goods'
  import Ratings from 'components/ratings/ratings'
  import Seller from 'components/seller/seller'
  import Tab from 'components/tab/tab'
  export default {
    data() {
      return {
        seller: {
          id: qs.parse(location.search.id)
        }
      }
    },
    computed: {
      // 注意：tab中不要定义在data中
      // seller定义在data中，并且seller的值是变化的，而tabs依赖这个变化，应该用计算属性去实现tabs
      tabs() {
        return [
          {
            label: '商品',
            component: Goods,
            data: {
              seller: this.seller
            }
          },
          {
            label: '评论',
            component: Ratings,
            data: {
              seller: this.seller
            }
          },
          {
            label: '商家',
            component: Seller,
            data: {
              seller: this.seller
            }
          }
        ]
      }
    },
    created() {
      this._getSeller()
    },
    methods: {
      _getSeller(){
        getSeller({}).then((seller) => {
          // 对象合并
          console.log(seller)
          this.seller = Object.assign({}, this.seller, seller)
        })
      }
    },
    components: {
      VHeader,
      Tab
    }
  }
</script>
<style lang="stylus" scoped>
  #app
    .tab-wrapper
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
