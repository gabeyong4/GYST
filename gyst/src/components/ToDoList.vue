/* eslint-disable vue/no-unused-components */
<template>
  <h1 class="TopBar">To Do Goals</h1>
  <div>
  <b-card-group deck>
    <b-card title="Wellness" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
        <b-card-text>
          This card has supporting text below as a natural lead-in to additional content.
        </b-card-text>
        <template #footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
    </b-card>
    <b-card title="Others" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This card has even longer content than the first to show that equal height action.
      </b-card-text>
      <template #footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>
  </b-card-group>
  </div>
  <h1 class="TopBar">To Do List</h1>

  <div class="d-flex mb-5">
    <input v-model="newTodo" type="text" placeholder="Add a new item" class="form-control form-input me-3"/>
    <button type="submit" class="submit-btn px-3 py-2" @click="addTodo()">Add</button>
  </div>
  <div class="row todo-list shadow px-3 pt-3 pb-2 align-items-center mb-4" v-for="(todo, index) in todos" :key="index">
    <div class="col-7 text-start">
      <h5 :class="{ 'todo-finished': todo.status === 'finished' }">{{ todo.name }}</h5>
    </div>
    <div class="col">
      <div class="d-flex justify-content-start align-items-center">
        <div class="status-indicator mb-1 me-2" :class="{
            'status-indicator-todo': todo.status === 'to-do',
            'status-indicator-ongoing': todo.status === 'on-going',
            'status-indicator-finished': todo.status === 'finished',
          }">
        </div>
        <div class="status-text" @click="changeStatus(index)" :class="{
            'status-text-todo': todo.status === 'to-do',
            'status-text-ongoing': todo.status === 'on-going',
            'status-text-finished': todo.status === 'finished',
          }">
          <h5>{{ todo.status }}</h5>
        </div>
      </div>
    </div>
    <div class= "col">
      <div class="d-flex justify-content-start align-items-center">
        <div class="tag-indicator mb-1 me-2" :class="{
            'tag-indicator-school': todo.tag === 'School',
            'tag-indicator-wellness': todo.tag === 'Wellness',
            'tag-indicator-others': todo.tag === 'Others',
          }">
        </div>
        <div class="tag-text" @click="changeTag(index)" :class="{
            'tag-text-school': todo.tag === 'School',
            'tag-text-wellness': todo.tag === 'Wellness',
            'tag-text-others': todo.tag === 'Others',
          }">
          <h5>{{ todo.tag }}</h5>
        </div>
      </div>
    </div>
    <div class="col text-end action-btn">
      <div class="d-flex justify-content-end">
        <div class="" @click="upTodo(index)">
          <i class="fas fa-arrow-up ml-4 mx-2"></i>
        </div>
        <div class="" @click="downTodo(index)">
          <i class="fas fa-arrow-down ml-4 mx-2"></i>
        </div>
        <div class="" @click="editTodo(index)">
          <i class="far fa-edit ml-4 mx-2"></i>
        </div>
        <div class="" @click="deleteTodo(index)">
          <i class="far fa-trash-alt ml-4 mx-2"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { BIcon, BIconArrowUp } from 'bootstrap-vue'
import firebaseApp from "../firebase.js";
  import {getFirestore} from "firebase/firestore";
  import {addDoc, collection, getDocs, query, getCountFromServer, where, setDoc, doc, deleteDoc} from "firebase/firestore"; // , doc, deleteDoc, setDoc
  import { getAuth } from "@firebase/auth";

// const auth = getAuth()
// this.fbuser = auth.currentUser.email
//   const email = user.email

  const db = getFirestore(firebaseApp);

export default {
  name: "ToDo",
  data() {
    return {
      newTodo: "",
      indexEditTodo: null,
      tempNameTodo: "",
      tempStatusTodo: "",
      todoStatus: ["to-do", "on-going", "finished"],
      todoTag: ["School", "Wellness", "Others"],
      todos: [],
    };
  },
  /*components: {
      BIcon,
      // eslint-disable-next-line vue/no-unused-components
      BIconArrowUp
    },*/
    created() {
        // this.createCollection()
        this.getList();
    },
  methods: {
    async getList() {
            const auth = getAuth();
            const user = auth.currentUser;
            this.fbuser = String(user.email)
            const coll = collection(db, this.fbuser);
            const snapshot = await getCountFromServer(coll);
            console.log('count: ', snapshot.data().count); // getting the count of documents
            let z = await getDocs(query(collection(db, String(this.fbuser))));
            z.forEach((doc) => {
                console.log(doc)
                this.todos.push({
                  name: doc.data().name,
                  status: doc.data().status,
                  tag: doc.data().tag
                })
            })
        },
    async addTodo() {
      const auth = getAuth();
      const user = auth.currentUser;
      this.fbuser = String(user.email)
      if (this.newTodo.length === 0) return;
      //if (this.indexEditTodo === null) {
      try {
        const newRow = await addDoc(collection(db, this.fbuser), {
          name: this.newTodo,
          status: "to-do",
          tag: "School"
        });
        console.log(newRow)
        alert("refresh")
        window.location.reload()
        this.$emit("added")
      }
      catch(error) {
              console.error("Error adding document ", error)
      }
      /*} else {
        await setDoc(doc(db, this.fbuser, this.todos[this.indexEditTodo].name), {
          name: this.newTodo,
          status: this.todos[this.indexEditTodo].status,
          tag: this.todos[this.indexEditTodo].tag
      });
        this.indexEditTodo = null;
      } */
      this.newTodo = "";
    },

    async editTodo(index) {
      const auth = getAuth();
      const user = auth.currentUser;
      this.fbuser = String(user.email)
      const oldVal = this.todos[index].name;
      //const docRef = doc(db, this.fbuser, where("name", "==", oldVal));
      const q = query(collection(db, this.fbuser), where("name", "==", oldVal));
      const querySnapshot = await getDocs(q);
      var currID;
      querySnapshot.forEach((doc) => { // did not account for multiple queries here
          currID = doc.id
          console.log(doc.id, " => ", doc.data());
      });
      await setDoc(doc(db, this.fbuser, currID), {
          name: oldVal,
          status: this.todos[index].status
      });
      this.indexEditTodo = index;
    },

    async deleteTodo(index) {
      const auth = getAuth();
      const user = auth.currentUser;
      this.fbuser = String(user.email)
      const docRef = doc(db, this.fbuser, where("name", "==", this.todos[index].name)); 
      await deleteDoc(docRef).then(() => { console.log("Entire Document has been deleted successfully.") }).catch(error => { console.log(error); })
      this.todos.splice(index, 1);
    },

    async changeStatus(index) {
      const auth = getAuth();
      const user = auth.currentUser;
      this.fbuser = String(user.email)
      let statusIndex = this.todoStatus.indexOf(this.todos[index].status);
      if (++statusIndex > 2) {
        statusIndex = 0;
      }
      this.todos[index].status = this.todoStatus[statusIndex];
      await setDoc(doc(db, this.fbuser, this.todos[index].name), {
          name: this.todos[index].name,
          status: this.todoStatus[statusIndex],
          tag: this.todos[index].tag
      });
    },
    async changeTag(index) {
      const auth = getAuth();
      const user = auth.currentUser;
      this.fbuser = String(user.email)
      let tagIndex = this.todoTag.indexOf(this.todos[index].tag);
      if (++tagIndex > 2) {
        tagIndex = 0;
      }
      this.todos[index].tag = this.todoTag[tagIndex];
      await setDoc(doc(db, this.fbuser, this.todos[index].name), {
          name: this.todos[index].name,
          status: this.todos[index].name,
          tag: this.todoTag[tagIndex]
      });
    },

    async upTodo(index) {
      const auth = getAuth();
      const user = auth.currentUser;
      this.fbuser = String(user.email)
      if (index === 0) return;
      this.tempNameTodo = this.todos[index].name;
      this.tempStatusTodo = this.todos[index].status;
      this.todos[index].name = this.todos[index - 1].name;
      this.todos[index].status = this.todos[index - 1].status;
      this.todos[index - 1].name = this.tempNameTodo;
      this.todos[index - 1].status = this.tempStatusTodo;
    },
    async downTodo(index) {
      const auth = getAuth();
      const user = auth.currentUser;
      this.fbuser = String(user.email)
      if (index === this.todos.length - 1) return;
      this.tempNameTodo = this.todos[index].name;
      this.tempStatusTodo = this.todos[index].status;
      this.todos[index].name = this.todos[index + 1].name;
      this.todos[index].status = this.todos[index + 1].status;
      this.todos[index + 1].name = this.tempNameTodo;
      this.todos[index + 1].status = this.tempStatusTodo;
    },
  },
};
</script>

<style scoped>
  .TopBar {
    padding: 20px;
    text-align: center;
    background-color: #474e5d;
    color: white;
  }
    .container {
      width: 100%;
    }
    .form-input {
    border: 1px solid #333;
    border-radius: 50px;
    }
    .form-control:focus {
    box-shadow: none;
    /* border: none; */
    }
    .submit-btn {
    background-color: skyblue;
    border-radius: 10%;
    border: none;
    font-size: 20px;
    font-weight: 800;
    color: #333;
    }
    .todo-list {
    border-radius: 50px;
    background-color: rgba(128, 128, 128, 0.143);
    }
    .todo-finished {
    font-style: italic;
    text-decoration: line-through;
    }
    .status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    }
    .status-indicator-todo {
    background: red;
    }
    .status-indicator-ongoing {
    background: rgb(171, 171, 71);
    }
    .status-indicator-finished {
    background: green;
    }
    .status-text {
    font-weight: bold;
    cursor: pointer;
    }
    .status-text-todo {
    color: red;
    }
    .status-text-ongoing {
    color: rgb(171, 171, 71);
    }
    .status-text-finished {
    color: green;
    }
    .tag-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    }
    .tag-indicator-school {
    background: red;
    }
    .tag-indicator-wellness {
    background: rgb(171, 171, 71);
    }
    .tag-indicator-others {
    background: green;
    }
    .tag-text {
    font-weight: bold;
    cursor: pointer;
    }
    .tag-text-school {
    color: red;
    }
    .tag-text-wellness {
    color: rgb(171, 171, 71);
    }
    .tag-text-others {
    color: green;
    }
    .action-btn i {
    font-size: 25px;
    cursor: pointer;
    }
</style>

