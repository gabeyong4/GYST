<template>
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

</style>