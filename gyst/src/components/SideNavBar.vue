<template>
  <div class="sidebar" :style= "{ width: sidebarWidth}">
    <h3>
    <span v-if="collapsed">
      <img id="logo" src="@/assets/gyst_logo.png" alt="" class="center">
    </span>
    <span v-else> 
      <img id="logo" src="@/assets/gyst_logo.png" alt="" class="center">
    </span>
    </h3>
    <br> <br> <br>
    <SideBarLink to="/home" icon="fa-solid fa-house-user">  Home </SideBarLink>
    <SideBarLink to="/budget" icon = "fa-solid fa-dollar-sign">  Budget Tracking </SideBarLink>
    <SideBarLink to="/todogoals" icon = "fa-solid fa-list-check">  To-do Goals</SideBarLink>
    <SideBarLink to="/profile" icon = "fa-solid fa-user-secret"> Profile</SideBarLink>
    <SideBarLink to="/about" icon="fa-regular fa-page">  About </SideBarLink>
    <LogOut icon="fa fa-sign-out"> </LogOut>

  </div>
</template>

<script>
import LogOut from '@/components/LogOut.vue';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {sidebarWidth} from './state.js'
import SideBarLink from "./SideBarLink.vue"


export default {
    name: 'SideBar',

    props: {},
    components: {SideBarLink,LogOut},

    setup() {
      return { sidebarWidth }
    },

    data() {
        return {
            user: false,
        }
    },
  
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    }

}
</script>

<style>


:root {
  --sidebar-bg-color: #267FCA;
  --sidebar-item-hover: white;
  --sidebar-item-active: white;
}


</style>

<style scoped>


/* The sidebar menu */
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  width: 0 1.5%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction:column;
}

.sidebar span:hover {
  font-weight: bold;
  color: white;
}

a {
  text-decoration: none;
}

#logo {
  position: absolute;
  width: 100px;
  height: 86px;
  left: 5px;
  top: 0px;
  user-select: none;
  margin: 0.1em 0;
}

</style>