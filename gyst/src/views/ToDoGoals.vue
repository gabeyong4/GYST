/* eslint-disable vue/no-parsing-error */
<template>
    <SideNavBar/>
    <ToDoList/>

</template>

<script>
//import ToDoGoal from '@/components/ToDoGoal.vue';
import ToDoList from '@/components/ToDoList.vue';
import SideNavBar from '@/components/SideNavBar.vue';


export default {
    name: "TodoGoals",
    components: { SideNavBar, ToDoList },
}
</script>
<style>

</style>

