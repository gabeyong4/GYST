<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
  <div class="sidenav">
    <div class="logo">
    <img src="../assets/gyst_logo.png" atl = GYST>
    </div> <br>
    <h3> Menu </h3>
    <div class = "menu">
      <router-link class="button" to="">
        <span class="material-symbols-outlined">attach_money</span>
        <span class="text"> Budget Tracking </span>
      </router-link> <br>
      <router-link class="button" to="">
        <span class="material-symbols-outlined">attach_money</span>
        <span class="text"> Todo Goals </span>
      </router-link>
    </div>
</div>
</template>

<script>
export default {
    name: "SideNavBar"

}
</script>

<style scoped>


/* The sidebar menu */
.sidenav {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0px;
    text-align: left;

    min-height: 100vh; /* Full-height: remove this if you want "auto" height */

    width: 250px; /* Set the width of the sidebar */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: white; /* White */
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.170509);
}

/* The navigation menu links */
.sidenav .menu {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #2C2C2C;
  display: block;
}

/* When you mouse over the navigation links, change their color */
.sidenav .menu:hover {
  color: #267FCA;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
/* @media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
} */

img {
  position: absolute;
  width: 57px;
  height: 43px;
  left: 7px;
  top: 6px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

</style>