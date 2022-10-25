<template>
  <div class="ellipse"></div>
</template>

<script>
import App from "./App.vue";
import "../styleguide.css"
import "../global.css"
import vueConfig from "vue.config";
import { useStore } from 'vuex'
export default {
	beforeCreate() {
        const store = useStore()
		store.commit('loadStore');
	}
}
Vue.config.productionTip = false;
new Vue ({
  render: h => h(App),
}).$mount(App);
console.log("in App")
export default {
  name: "App",
};
</script>

<style>
  .ellipse {
      background-color: #267fc9;
      border: 1px none;
      border-radius: 362px;
      height: 724px;
      width: 724px;
  }
</style>
