import Vue from 'vue'
import SvgIcon from './SvgIcon.vue'

Vue.component('svg-icon', SvgIcon)

const req = require.context('../../assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)