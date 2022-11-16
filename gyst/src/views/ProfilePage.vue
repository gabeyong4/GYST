<template>
  <SideNavBar/>
  <ProfileCard/>
</template>

<script>
// import SideNavBar from '@/components/SideNavBar.vue'
import ProfileCard from '@/components/ProfileCard.vue'

export default {
    name: "ProfilePage",
    components: { ProfileCard }

}
</script>

<style>

.TopBar {
    text-align: center;
    background-color: #474e5d;
    color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.170509);
    margin: 5px;
    float: right;
    max-width: 3000px;
    width: 80%;
    margin-right: 50px;
  }

</style>