<template>
  <SideNavBar/>
  <ProfileInfo/>
</template>

<script>
import SideNavBar from '@/components/SideNavBar.vue'
import ProfileInfo from '@/components/ProfileInfo.vue'

export default {
    name: "ProfilePage",
    components: { SideNavBar, ProfileInfo }

}
</script>

<style>

</style>