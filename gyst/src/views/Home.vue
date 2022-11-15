<template>
  <SideNavBar />
  <!-- <div :style="{ 'margin-left' : sidebarWidth}">
    <router-view></router-view>
  </div> -->
  <h1 class="TopBar">GYST</h1><br><br><br>

  <div id="app">
    <CalendarMonth/>
  </div>

</template>

<script>
import SideNavBar from '@/components/SideNavBar.vue';
import { sidebarWidth } from '@/components/state';
import CalendarMonth from '@/components/CalendarMonth.vue';


export default {
  name: 'App',
  
  components: {
    SideNavBar,
    CalendarMonth
  },

  setup() {
    return (sidebarWidth)
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

  #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

body {
  font-family: sans-serif;
  font-weight: 100;
  --grey-100: #e4e9f0;
  --grey-200: #cfd7e3;
  --grey-300: #b5c0cd;
  --grey-800: #3e4e63;
  --grid-gap: 1px;
  --day-label-size: 20px;
}

ol,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.calendar-month-header {
  display: flex;
  justify-content: space-between;
  background-color: skyblue;
  padding: 10px;
}

</style>