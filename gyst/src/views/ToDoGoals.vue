/* eslint-disable vue/no-parsing-error */
<template>
    <SideNavBar/>
    
    <ToDoList/>
    <LogOut/>
</template>

<script>
//import ToDoGoal from '@/components/ToDoGoal.vue';
import ToDoList from '@/components/ToDoList.vue';
import SideNavBar from '@/components/SideNavBar.vue';
import LogOut from '@/components/LogOut.vue';


export default {
    name: "TodoGoals",
    components: { SideNavBar, LogOut, ToDoList },
}
</script>
<style>

</style>

