<template>
  <SideNavBar msg="Welcome to Your Vue.js App"/>
</template>

<script>
import SideNavBar from './components/SideNavBar.vue'

export default {
  name: 'App',
  components: {
    SideNavBar
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: auto;

  background: #F9F9F9;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.0778245);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.0778245);
  box-shadow: 0px 2px 8px 0px #00000014;
  
}


</style>
