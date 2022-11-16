<template>
  <div class="container">
    <div class="header">
        <h1>Profile Page</h1>
    </div>
    <div class="detail-container">
        <div id="profile-icon">
            <i class="fa-solid fa-user"></i>
        </div>
        <h1> Hi there Pal! </h1>
        <h3> These are your significant achievements for the past 30 days! </h3>
        <div class="profilecard" id="card1">
            <h3> {{ tasksDone }} </h3>
            <h5> Tasks Done </h5>
        </div>
        <div class="profilecard" id="card2">
            <h3> ${{ spending }} </h3>
            <h5> Total Spendings </h5>
        </div>
        <div class="profilecard" id="card3">
            <h3> #1 </h3>
            <h5> Best User </h5>
        </div>
        <div class="profilecard" id="card4">
            <h3> Nicolai and Para </h3>
            <h5> Have a Juicy coke </h5>
        </div>

        <div class="form-container">
            <h3> Your Details </h3>
            <label for="emailad"> Email </label>
            <input type="text" id="emailad" :placeholder="email"> <br>
            <label for="name"> Name </label>
            <input type="text" id="name" placeholder="John Doe"> <br>
            <label for="role"> Role </label>
            <input type="text" id="role" placeholder="Student">
        </div>
    </div>
  </div>

  <div>

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
            spending: 0,
            email: ""
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
            this.email = String(user.email)
            console.log(this.email)
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

    }


}
</script>

<style scoped>

.header {
    /* text-align: center;
    background-color: #474e5d; */
    color: white;
    /* box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.170509); */
    float: right;
    width: 100%;
    max-width: 1200px;
    background-color: #474e5d;
  }

.detail-container {
    float: right;
    background-color: #e9e9e9;
    max-width: 1200px;
    width: 100%;
    /* max-height: 1000px; */
    /* height: 1000px; */
    border: 2px solid rgb(213, 213, 213);
    border-radius: 10px;
    /* margin: 50px; */
    /* margin-right: 20px; */
    min-width: 800px;
    /* align-content: center; */
}

.profilecard {
    float: left;
    width: 170px;
    height: 120px;
    background-color: #E2F4FF;
    border: 2px solid rgb(117, 117, 117);
    margin: 45px;
    border-radius: 25px;
    text-align: center;
    display:block;
    justify-content: center;
    align-items: center;
    padding: 25px 0;
}

/* .profilecard #card3 h3 {
    text-align: center;
    display:block;
    justify-content: center;
    align-items: center;
} */

.container {
    float: right;
    width: 90%;
    max-width: 1200px;
    margin-right: 20px;
    min-width: 800px;
}

#profile-icon .svg-inline--fa {
    margin: 10px;
    width: 100px;
    height: 100px;
    padding: 5px;
    border: 2px solid #acb0bc;
    border-radius: 25px;
}

.divider .hr.solid {
    border-top: 3px solid black;
    float: right;
    height: 10px;
    background-color: black;
    width: 1080px;
}

.form-container {
    float: left;
    width: 1000px;
    height: 280px;
    background-color: #fafdff;
    border: 2px solid rgb(117, 117, 117);
    margin: 45px;
    border-radius: 25px;
    text-align: center;
    display:block;
    justify-content: center;
    align-items: center;
    padding: 25px 0;
}

.form-container input {
    margin: 10px;
    width: 300px;
    align-items: left;
}



</style>