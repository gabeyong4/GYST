<template>
  <SideNavBar />

  <div id="app">
    <CalendarMonth/>
  </div>

</template>

<script>
import { sidebarWidth } from '@/components/state';
import CalendarMonth from '@/components/CalendarMonth.vue';


export default {
  name: 'App',
  
  components: {
    CalendarMonth
  },

  setup() {
    return (sidebarWidth)
  }
}
</script>

<style>


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