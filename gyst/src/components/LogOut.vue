<template>
    
    <button id="btn" @click="signOut()" v-if="user">
        <i class="fa fa-sign-out"></i>Logout
    </button>
</template>

<script>
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth"
import { computed } from "vue"
import { useRoute } from "vue-router"
import { collapsed } from "./state.js"

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
    },

    setup(props) {
        const route = useRoute()
        const isActive = computed(() => route.path === props.to)
        return {isActive, collapsed}

    }

}
</script>

<style>
#btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;
    margin: 0.1em 0;
    height: 1.8em;
    text-decoration: none;
    background-color: rgb(244, 65, 65);
    border-radius: 0.4em;
}
.btn:hover {
    background-color: red;
}

</style>