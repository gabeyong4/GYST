<template>
  <SideNavBar/>
  <BudgetTable/>
  
  
</template>

<script>
// import SideNavBar from '@/components/SideNavBar.vue';
import BudgetTable from '@/components/BudgetTable.vue';

export default {
  name: "BudgetPage",
  components: { BudgetTable}
}
</script>

<style>

</style>