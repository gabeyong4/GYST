<template>
  <SideNavBar/>
  <div class="about-section">
    <h1>About Us</h1>
    <p>Hello Everyone! We are a group of students that wish to help other students track their expenses and task-completion!</p>
  </div>
 
  <br>
  <h2 style="text-align:center">Our Team</h2>
  <div class="row1">
    <div class="column1">
      <div class="card">
        <img src="@/assets/gabriel.png" alt ="Gabriel" class="center"> 
        <div class="container">
          <h2>Gabriel Yong</h2>
          <p class="title">Product Owner</p>
          <p>I'm Gabriel but you can call me Daddy</p>
          <p>gabrielyong@gmail.com</p>
          <p><button class="button">Contact Me</button></p>
        </div>
      </div>
    </div>  

    <div class="column2">
      <div class="card">
        <img src="@/assets/para.png" alt ="Para" class="center"> 
        <div class="container">
          <h2>Parathan Arasu</h2>
          <p class="title">SCRUM Master</p>
          <p>Hi there!</p>
          <p>parathan@gmail.com</p>
          <p><button class="button">Contact Me</button></p>
        </div>
      </div>
    </div>
  </div>

  <div class="row2">
    <div class="column1">
      <div class="card">
        <img src="@/assets/angel.png" alt ="Angel" class="center"> 
        <div class="container">
          <h2>Angel Koh</h2>
          <p class="title">SCRUM Team</p>
          <p>hehe XD</p>
          <p>angelkoh@gmail.com</p>
          <p><button class="button">Contact Me</button></p>
        </div>
      </div>
    </div>

    <div class="column2">
      <div class="card">
        <img src="@/assets/nicolai.png" alt ="Nicolai" class="center"> 
        <div class="container">
          <h2>Nicolai Neo</h2>
          <p class="title">SCRUM Team</p>
          <p>pee pee poo poo check</p>
          <p>nicolaineo@gmail.com</p>
          <p><button class="button">Contact Me</button></p>
        </div>
      </div>
    </div>
  </div>

  <br><br>
  
</template>

<script>
// import SideNavBar from '@/components/SideNavBar.vue';

export default {
    name: "AboutPage"
}
</script>

<style>

  body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  .row1 {
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0 4px;
  }
  .row2 {
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0 4px;
  }

  /* Create two equal columns that sits next to each other */
  .column1 {
    flex: 40%;
    padding: 0 4px;
  }
  .column2 {
    flex: 40%;
    padding: 0 4px;
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 80%;
    color: black;
    background-color: #000;
  }

  .about-section {
    padding: 20px;
    text-align: center;
    background-color: #474e5d;
    color: white;
  }

  .container {
    padding: 0 16px;
  }

  .container::after, .row::after {
    content: "";
    clear: both;
    display: table;
  }

  .button {
    border: none;
    outline: 0;
    display: inline-block;
    padding: 8px;
    color: white;
    background-color: #000;
    text-align: center;
    cursor: pointer;
    width: 100%;
  }

  .button:hover {
    background-color: #555;
  }

  @media screen and (max-width: 650px) {
    .column {
      width: 100%;
      display: block;
    }
  }

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
  } 


</style>