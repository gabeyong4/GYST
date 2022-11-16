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
.header {
  margin: 0 1.5%;
  width: 100%;
}

#table {
  /* float: right; */
  margin: 0 1.5%;
  width: 73%;
  top: 0;
}
</style>

