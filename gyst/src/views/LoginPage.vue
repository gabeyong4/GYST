<template>
    <section class="container">
        <article>
            <div class="left-half">
                <br><br><br><br><br>
                <img id="logo" src="@/assets/gyst_logo2.png" alt="" >
                <!-- <div id="pagecontent">
                    Welcome to GYST! Your one stop platform to track your expenses, to do lists, and much more!
                    Join now to discover a better you :)
                </div> -->
            </div>
        </article>
        <div class="right-half ">
            
            <h1>Welcome Back</h1>
            <div id="firebaseui-auth-container"></div>
        </div>
    </section>
</template>


<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'


export default {
    name:"LoginPage",

    mounted() {
        //Calling the ui instance
        var ui = firebaseui.auth.AuthUI.getInstance();
        if(!ui){
            // We need to create the instance only one time
            // Initialize the FirebaseUI Widget using Firebase
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }

        var uiConfig = {
            signInSuccessUrl: '/home',
            signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,    
            ]
        };
        ui.start("#firebaseui-auth-container", uiConfig)
    }

}

</script>

<style scoped>

#firebaseui-auth-container{
    margin-top: 50px;;
    margin-bottom: 50px;
}
* {
  box-sizing: border-box;
}
body {
  font-size: 1.25rem;
  font-family: sans-serif;
  line-height: 150%;
}

section {
  color: #fff;
  text-align: center;
}

div {
  height: 100%;
}

article {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

h1 {
  font-size: 1.75rem;
  margin: 0 0 0.75rem 0;
  color: black;
}

/* Pattern styles */
.container {
  display: table;
  width: 100%;
  
}

.left-half {
  position:relative;
  left: 0px;
  width: 50%;
  background-image: url('@/assets/studying2.png');
  background-size: 140% 100%;
  min-height: 100vh;
}

.right-half {
  background-color: white;
  position: absolute;
  right: 0px;
  top: 35%;
  width: 50%;
  
}

#pagecontent{
    height: 100%;
    font-size: larger;
    font-weight: bolder;
    text-align: center;
    color: black;
}
#mainHead{
    text-align: center;
    text-shadow: 2px 2px grey;
}
#logo{
    /* display: block; */
    /* margin-left: auto; */
    /* margin-right: auto; */
    width: 80%;
}
h5{
    text-align: center;
    background-color: rgb(194,202,188);
}

#bg{
    background-color: #2178C0;
    height: 100%;
}

</style>