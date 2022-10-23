<template>
  <SideNavBar />
  <div :style="{ 'margin-left' : sidebarWidth}">
    <router-view></router-view>
  </div>
  <LogOut/>
</template>

<script>
import LogOut from '@/components/LogOut.vue';
import SideNavBar from '@/components/SideNavBar.vue';
import { sidebarWidth } from '@/components/state';

export default {
  name: 'App',
  
  components: { LogOut, SideNavBar },

  setup() {
    return (sidebarWidth)
  },

  data() {

  }
}
</script>

<style>

</style>