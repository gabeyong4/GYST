<template>
  <button id="btn" @click="signOut()" v-if="user">Logout</button>
</template>

<script>
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth"

export default {
    name: "LogOut",

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
    },

    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user)
            this.$router.push({name: 'Login'})
        }
    }

}
</script>

<style>
#btn {
    text-align: center;
    margin: auto;
}
#btn:hover {
    color: rgb(243, 236, 236);
    background-color: #6b1d1d;
}

</style>