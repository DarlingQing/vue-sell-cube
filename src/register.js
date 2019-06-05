/**
 * 将部分组件做成API模式调用
 */
import {createAPI} from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from 'components/header-detail/header-detail'

createAPI(Vue, HeaderDetail)