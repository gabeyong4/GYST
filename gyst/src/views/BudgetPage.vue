<template>
  <SideNavBar/>
  <h1>This is the Budget Page</h1>
  <LogOut/>
  <h1> this sidebar is {{ collapsed ? 'closed' : 'open'}} </h1>
  <button @click="toggleSidebar"> Toggle Side bar </button>
</template>

<script>
import {collapsed, toggleSidebar} from "@/components/state.js"
import SideNavBar from '@/components/SideNavBar.vue';
import LogOut from '@/components/LogOut.vue';

export default {
  name: "BudgetPage",
  components: { SideNavBar, LogOut },
  setup() {
        return {collapsed, toggleSidebar}
    }
}
</script>

<style>

</style>
<!-- <template>
  <NavBar/>
  <h1>This is the Budget Page</h1>
  <LogOut/>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LogOut from '@/components/LogOut.vue';
export default {
    name: "BudgetPage",
    components: { NavBar, LogOut }
}
</script>

<style>

</style> -->