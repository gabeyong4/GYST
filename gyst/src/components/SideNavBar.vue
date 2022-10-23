<template>
  <div class="sidebar" :style= "{ width: sidebarWidth}">
    <h3>
      <span v-if="collapsed">
        <div>GYST</div>
      </span>
      <span v-else> GYST </span>
    </h3>

    <SideBarLink to="/" icon="fa-solid fa-house-user"> Home </SideBarLink>
    <SideBarLink to="/about" icon="fa-regular fa-page"> About </SideBarLink>
    <SideBarLink to="/budget" icon = "fa-solid fa-dollar-sign"> Budget Tracking </SideBarLink>
    <SideBarLink to="/todogoals" icon = "fa-solid fa-list-check"> To-do Goals</SideBarLink>

    <span 
      class = "collapse-icon" 
      :class="{'rotate-180': collapsed}"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left"> </i> 
    </span>

  </div>
</template>

<script>
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collapsed, toggleSidebar, sidebarWidth} from './state.js'
import SideBarLink from "./SideBarLink.vue"


export default {
    name: 'SideBar',

    props: {},
    components: {SideBarLink},

    setup() {
      return { collapsed, toggleSidebar, sidebarWidth }
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
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}


</style>

<style scoped>


/* The sidebar menu */
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar span:hover {
      font-weight: bold;
      color: #2c3e50;
}

.collapse-icon {
  position: absolute;
  bottom:0;
  padding: 0.75em;
  color: rgba(255,255,255,0.7);
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}


a {
  text-decoration: none;
}


</style>