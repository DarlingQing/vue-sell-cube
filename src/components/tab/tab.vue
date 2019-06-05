<template>
  <div class="tab">
    <cube-tab-bar
      :showSlider=true
      :useTransition=false
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop=false
        :auto-play=false
        :show-dots=false
        :options="slideOptions"
        :initial-index="index"
        ref="slide"
        @scroll="onScroll"
        @change="onChange"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <!-- vue提供的动态组件 -->
          <component ref="component" :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'tab',
    props: {
      tabs: {
        type: Array,
        default() {
          return []
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        index: this.initialIndex,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      selectedLabel: {
        get() {
          return this.tabs[this.index].label
        },
        set(newVal) {
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
    },
    mounted() {
      // this.onChange(this.index)
      console.log(this.tabs)
    },
    methods: {
      onScroll(pos) {
        // console.log(pos.x)
        // 获取组件的宽度，先获取$el元素
        const tabBarWidth = this.$refs.tabBar.篇
        // console.log(tabBarWidth)
        const slideWidth = this.$refs.slide.slide.scrollWidth
        const transform = -pos.x / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(transform)
      },
      onChange(currentIndex) {
        this.index = currentIndex
        // const instance = this.$refs.component[currentIndex]
        // if (instance && instance.fetch) {
        //   instance.fetch()
        // }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex: 1
      overflow: hidden
</style>
