import Vue from 'vue'
import vue100vh from 'vue-100vh'
import Unity from 'vue-unity-webgl'
import VueTypedJs from 'vue-typed-js'
import PageWrapper from '~/components/page/wrapper.vue'

Vue.component('PageWrapper', PageWrapper)
Vue.component('vue100vh', vue100vh)
Vue.component('unity', Unity)
Vue.use(VueTypedJs)
