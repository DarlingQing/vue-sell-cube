<template>
  <div>
    <transition name="fade">
      <cube-popup
        :mask-closeable=true
        v-show="visible"
        @mask-click="maskClick"
        position="bottom"
        type="shop-cart-list"
        :z-index=90
      >
        <transition name="move" @after-leave="afterLeave">
          <div v-show="visible">
            
          </div>
        </transition>
      </cube-popup>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'shop-cart-list',
  // mixins: [popupMixin],
  created() {

  },
  methods: {

  }
}
</script>