<template>
  <SideNavBar/>
  <div class="header">
    <h1>This is the Budget Page</h1>
  </div>
  <BudgetTable/>
  
  
</template>

<script>
import SideNavBar from '@/components/SideNavBar.vue';
import BudgetTable from '@/components/BudgetTable.vue';

export default {
  name: "BudgetPage",
  components: { SideNavBar, BudgetTable}
}
</script>

<style>

.header {
  float: right;
  margin: 0 1.5%;
  width: 73%;
}

#table {
  float: right;
  margin: 0 1.5%;
  width: 73%;
}

</style>