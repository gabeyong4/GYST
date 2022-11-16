<template>
  <SideNavBar/>
  <div class="TopBar">
    <h1>Profile Page</h1>
  </div>
  <ProfileCard/>
</template>

<script>
import SideNavBar from '@/components/SideNavBar.vue'
import ProfileCard from '@/components/ProfileCard.vue'

export default {
    name: "ProfilePage",
    components: { SideNavBar, ProfileCard }

}
</script>

<style>

.TopBar {
    text-align: center;
    background-color: #474e5d;
    color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.170509);
    margin: 5px;
  }

</style>