<template>

<router-view/>

</template>

<script>
<<<<<<< HEAD
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
=======

console.log("in App")


>>>>>>> cb405a7c5949c1348ef2596db8d2e78a8a75d91e
export default {
    name: "App",
    
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */


</style>
