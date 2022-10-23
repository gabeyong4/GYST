<template>
  <NavBar/>
  <h1>Welcome to your Home Page</h1>
  <LogOut/>
</template>

<script>
import LogOut from '@/components/LogOut.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  
  components: { LogOut, NavBar },

  data() {

  }
}
</script>

<style>

</style>