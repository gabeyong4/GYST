<template>
  <SideNavBar/>
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
  margin: 0 1.5%;
  width: 73%;
}

#table {
  /* float: right; */
  margin: 0 1.5%;
  width: 73%;
  top: 0;
}

</style>