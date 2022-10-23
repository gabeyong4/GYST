<template>
  <div style="text-align:center;" v-if="user">
    <NavBar/>
    <h1>This is an about page</h1>
    <h1>Welcome to GYST</h1>
    <h3>Description of GYST: dnslfdkf</h3>
    <LogOut/> <br><br>
  </div>
  
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