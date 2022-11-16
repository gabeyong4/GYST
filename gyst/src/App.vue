<template>
  <SideNavBar/>
  <router-view/>

</template>

<script>
import "./styleguide.css"
import SideNavBar from './components/SideNavBar.vue';


export default {
  name:"App",

  components: {
    SideNavBar
  }
	
};

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
