<template>
    <div id="bg" style="text-align:center;">
        <img id="logo" src="@/assets/gyst_logo.png" alt="" class="center">
        <div id="firebaseui-auth-container"></div>
        <div id="pagecontent">
            Welcome to GYST! Your one stop platform to track your expenses, to do lists, and much more!
            Join now to discover a better you :)
        </div>
        <h5>Copyright@GYST-2022</h5>
    </div>
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
#pagecontent{
    height: 100px;
    font-size: larger;
    font-weight: bolder;
    text-align: center;
    color: white;
}
#mainHead{
    text-align: center;
    text-shadow: 2px 2px grey;
}
#logo{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 30%;
}
h5{
    text-align: center;
    background-color: rgb(194,202,188);
}

#bg{
    background-color: #2178C0;
}
</style>