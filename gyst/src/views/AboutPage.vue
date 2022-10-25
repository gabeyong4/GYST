<template>
  <SideNavBar/>
  <h1>This is an about page</h1>
  <h1>Welcome to GYST</h1>
  <h3>Description of GYST: dnslfdkf</h3>
  <LogOut/> <br><br>
  
</template>

<script>
import SideNavBar from '@/components/SideNavBar.vue';
import LogOut from '@/components/LogOut.vue';
export default {
    name: "AboutPage",
    components: { SideNavBar, LogOut }
}
</script>

<style>

</style>