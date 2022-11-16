<template>
  <SideNavBar/>
  <router-view/>

</template>

<script>
//import App from "./App.vue";
import "./styleguide.css"
//import "../global.css"
//import vueConfig from "vue.config";
//import { useStore } from 'vuex'
import SideNavBar from './components/SideNavBar.vue';


export default {
  name:"App",

  components: {
    SideNavBar
  }
	/*beforeCreate() {
        const store = useStore()
		store.commit('loadStore');
	}*/
};
/*vueConfig.productionTip = false;
// eslint-disable-next-line no-undef
new Vue ({
  render: h => h(App),
}).$mount(App);
*/
console.log("in App")

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
} 


</style>
