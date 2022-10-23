<template>
  <NavBar/>
  <h1>This is an about page</h1>
  <h1>Welcome to GYST</h1>
  <h3>Description of GYST: dnslfdkf</h3>
  <LogOut/> <br><br>
  
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LogOut from '@/components/LogOut.vue';
export default {
    name: "AboutPage",
    components: { NavBar, LogOut }
}
</script>

<style>

</style>