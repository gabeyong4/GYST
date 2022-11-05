<template>
  <SideNavBar />
  <!-- <div :style="{ 'margin-left' : sidebarWidth}">
    <router-view></router-view>
  </div> -->
  <h1 class="TopBar">Welcome to GYST</h1><br><br><br>

  <div id="budgetDash">
    <h2>This is the container for budget</h2><br><br><br>
  </div>

  <div id="todo">
    <h2>This is the container for to-do</h2>
  </div>

</template>

<script>
import SideNavBar from '@/components/SideNavBar.vue';
import { sidebarWidth } from '@/components/state';


export default {
  name: 'App',
  
  components: {SideNavBar},

  setup() {
    return (sidebarWidth)
  },

  data() {

  }
}
</script>

<style>
.TopBar {
    /* padding: 20px; */
    text-align: center;
    background-color: #474e5d;
    color: white;
  }

</style>