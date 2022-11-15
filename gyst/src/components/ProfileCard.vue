<template>
  <div id="container">
    <div id="profile-icon">
        <i class="fa-solid fa-user"></i>
    </div>
    <h1> User Name </h1>
    <h3> Student </h3>
    <br>
    <div class="profilecard" id="card1">
        <h2> {{ tasksDone }} </h2>
        <h4> Tasks Done </h4>
    </div>
    <div class="profilecard" id="card2">
        <h2> ${{ spending }} </h2>
        <h4> Total Spendings </h4>
    </div>
    <div class="profilecard" id="card3">
        <h2> #1 </h2>
        <h4> Best User </h4>
    </div>
    <div class="profilecard" id="card4">
        <h2> Nicolai and Para </h2>
        <h4> Have a Big fat Juicy Cok </h4>
    </div>
  </div>

</template>

<script>
import firebaseApp from "../firebase.js";
import {getFirestore} from "firebase/firestore";
import {collection, getCountFromServer, query, getDocs} from "firebase/firestore"; // , doc, deleteDoc, updateDoc
import { getAuth, onAuthStateChanged} from "@firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    name: "App",

    data() {
        return {
            tasksDone: 0,
            spending: 0
        }
    },

    created() {
        this.getData();
        // this.getTotalSpent();
    },

    mounted() {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user
            }
        })
    },

    methods: {
        async getData() {
            const auth = getAuth();
            const user = auth.currentUser
            this.fbuser = String(user.email) + " To Do List"
            // this.fbuser = String(this.user.email)
            const coll = collection(db, this.fbuser);
            const snapshot = await getCountFromServer(coll);
            this.count = snapshot.data().count
            console.log('count: ', snapshot.data().count); // getting the count of documents
            let z = await getDocs(query(collection(db, String(this.fbuser))));
            z.forEach((doc) => {
                if (doc.data().status == "finished") {
                    this.tasksDone = this.tasksDone + 1
                }
                console.log(doc.data().status)
                
                // this.rowData.push(doc.data())
            })
            console.log(this.tasksDone)

            this.fbuser2 = String(user.email) + " Budget Table"
            // this.fbuser = String(this.user.email)
            const coll2 = collection(db, this.fbuser2);
            const snapshot2 = await getCountFromServer(coll2);
            this.count = snapshot2.data().count
            console.log('count: ', snapshot2.data().count); // getting the count of documents
            let y = await getDocs(query(collection(db, String(this.fbuser2))));
            y.forEach((doc) => {
                this.spending = this.spending + doc.data().amount
            })
            console(this.spending)
        },

        // async getTotalSpent() {
        //     const auth = getAuth();
        //     const user = auth.currentUser
        //     this.fbuser = String(user.email) + " Budget Table"
        //     // this.fbuser = String(this.user.email)
        //     const coll = collection(db, this.fbuser);
        //     const snapshot = await getCountFromServer(coll);
        //     this.count = snapshot.data().count
        //     console.log('count: ', snapshot.data().count); // getting the count of documents
        //     let z = await getDocs(query(collection(db, String(this.fbuser))));
        //     z.forEach((doc) => {
        //         this.spending = this.spending + doc.data().amount
        //     })
        //     console(this.spending)
        // }
    }


}
</script>

<style>

.profilecard {
    float: left;
    width: 200px;
    height: 150px;
    background-color: #E2F4FF;
    border: 2px solid rgb(117, 117, 117);
    margin: 30px;
    border-radius: 25px;
    text-align: center;
    display:block;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
}

/* .profilecard #card3 h3 {
    text-align: center;
    display:block;
    justify-content: center;
    align-items: center;
} */

#container {
    float: right;
    background-color: #e9e9e9;
    width: 1080px;
    height: 800px;
    border: 2px solid rgb(213, 213, 213);
    border-radius: 10px;
}

#profile-icon .svg-inline--fa {
    margin: 10px;
    width: 100px;
    height: 100px;
    padding: 5px;
    border: 2px solid #acb0bc;
    border-radius: 25px;
}


</style>