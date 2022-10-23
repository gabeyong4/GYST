<template>
    <div id="logged" v-if="user">
      <div id="nav">
          <router-link to="/home">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/budget">Budget</router-link> |
          <router-link to="/todogoals">ToDoGoals</router-link> |
      </div>
    
    </div>
  </template>
  
  <script>
  import {getAuth, onAuthStateChanged} from "firebase/auth";
  export default {
      name: 'NavBar',
  
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
  #nav {
      padding: 30px;
      text-align: center;
  }
  
  #nav a {
      font-weight: bold;
      color: #2c3e50;
  }
  
  #nav a.router-link-exact-active {
      color: #42b983;
  }
  
  </style>