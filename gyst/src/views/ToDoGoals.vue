<template>
    <NavBar/>
    <h1>This page is the ToDoGoals page</h1>
    <LogOut/>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LogOut from '@/components/LogOut.vue';
export default {
    name: "ToDoGoals",
    components: { NavBar, LogOut }
}
</script>

<style>

</style>