<template>
  <div class="TopBar">
      <h1>To Do List </h1>
  </div>
  <AgGridVue/>
  <!-- <button non="deselectRows">deselect rows</button> -->
  <ag-grid-vue
  :key="componentKey"
  class="ag-theme-alpine"
  :columnDefs = "columnDefs"
  :rowData = "rowData"
  :rowSelection="rowSelection"
  @cell-value-changed = "save"
  @selection-changed = "onSelectionChanged"
  @row-selected = "onRowSelected">
  </ag-grid-vue>
  <button id="addnewRows" v-on:click = "addNewRow();"> Add New Row </button>
  <button id="deleteRow" v-on:click = "deleteRow()">Remove Selected</button>
</template>

<script>
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
//   import { reactive } from "vue";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import firebaseApp from "../firebase.js";
import {getFirestore} from "firebase/firestore";
import {deleteDoc, addDoc, collection, getDocs, query, getCountFromServer, where, doc, setDoc, updateDoc} from "firebase/firestore"; // , doc, deleteDoc, updateDoc
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "App",
  
  data() {
      return {
          columnDefs: null,
          rowData:[],
          detailCellRendererParams: null,
          status: ["to-do", "on-going", "finished"],
          tag: ["School", "Wellness", "CCA", "General"],
          priority: ["High", "Medium", "Low"],
          rowSelection: null,
          gridApi: null,
          rowSelected: [], // the variable we want to make globally in order to use in deleteRow()
          user: false,
          componentKey: 0,
          count: 0
      };
  },

  components: {
      AgGridVue,
  },

  created() {
      // this.createCollection()
      this.getToDoLst();
      this.rowSelection = "single"
  },

  methods: {

      async getToDoLst() {
          // console.log(this.user.email)
          const auth = getAuth();
          const user = auth.currentUser
          this.tduser = String(user.email) + " To Do List"
          // this.tduser = String(this.user.email)
          const coll = collection(db, this.tduser);
          const snapshot = await getCountFromServer(coll);
          this.count = snapshot.data().count
          console.log('count: ', snapshot.data().count); // getting the count of documents
          let z = await getDocs(query(collection(db, String(this.tduser))));
          z.forEach((doc) => {
              console.log(doc)
              this.rowData.push(doc.data())
          })
      },

      async addNewRow() {
          // console.log(this.user.email)
          this.tduser = String(this.user.email) + " To Do List"
          console.log(this.tduser)
          try {
              this.count = this.count + 1
              const newRow = await addDoc(collection(db, this.tduser), {
                  header: this.count,
                  item: "sample",
                  date:"sample",
                  status: this.status[0],
                  tag: this.tag[0],
                  priority: this.priority[0]
              });
              console.log(newRow)
              // this.methodThatForcesUpdate()
              // this.forceRerender()
              // alert("refresh")
              // console.log(this.componentKey)
              // this.$router.go()
              window.location.reload()
              // this.$emit("added")
          }

          catch(error) {
              console.error("Error adding document ", error)
          }
          
      },

      async save(event) {
          // const oldVal = event.oldValue
          // const columnChanged = event.colDef.field
          // console.log("old val: " + oldVal)
          console.log(event.colDef.field)
          const currData = event.data
          console.log(typeof currData.amount)
          const auth = getAuth();
          const user = auth.currentUser;
          this.tduser = String(user.email) + " To Do List"
          // const q = query(collection(db, this.tduser), where("tasks", "==", oldVal));
          const q = query(collection(db, this.tduser), where("header", "==", currData.header));
          const querySnapshot = await getDocs(q);
          console.log(querySnapshot)
          var currID;
          querySnapshot.forEach((doc) => { // did not account for multiple queries here
              currID = doc.id
              console.log(doc.id, " => ", doc.data());
          });

          await setDoc(doc(db, this.tduser, currID), {
              header: currData.header,
              item: currData.item,
              date: currData.date,
              status: currData.status,
              tag: currData.tag,
              priority:currData.priority
          });
          

          // console.log('onCellValueChanged: ' + event.oldValue + ' to ' + event.newValue + " ")

      },

      async onRowSelected(event) {
          // store the data that is selected as a variable to use in the delete function
          this.rowSelected.push(event.node.data)
          console.log(this.rowSelected)
      },

      // async resetDoc(doc, counter) {
      //     await updateDoc(doc, {
      //         "header": counter,
      //     });
      // },

      // async resetIndex() {
      //     const auth = getAuth();
      //     const user = auth.currentUser;
      //     this.tduser = String(user.email)
      //     const querySnapshot = await getDocs(collection(db, this.tduser));
      //     var counter = 1
      //     querySnapshot.forEach((doc) => {
      //         this.resetDoc(doc, counter)
      //         counter = counter + 1
      //     // doc.data() is never undefined for query doc snapshots
      //         console.log(counter)
      //         console.log(doc.id, " => ", doc.data().header);
      //     });

      //     // await setDoc(doc(db, this.tduser, currID), {
      //     //     header: currData.header,
      //     //     tasks: currData.tasks,
      //     //     amount:Number(currData.amount),
      //     //     date:currData.date,
      //     //     category:currData.category,
      //     //     comments:currData.comments
      //     // });

      // },

      // after deletion we need to update the index of the rest of the elements
      async deleteRow() {
          // console.log(this.rowSelected)
          const auth = getAuth();
          const user = auth.currentUser;
          this.tduser = String(user.email) + " To Do List"
          // const currData = this.rowSelected[0]
          const headSelected = this.rowSelected[0].header
          // const q = query(collection(db, this.tduser), where("tasks", "==", oldVal));
          const q = query(collection(db, this.tduser), where("header", "==", headSelected));
          const querySnapshot = await getDocs(q);
          var currID;
          querySnapshot.forEach((doc) => { // did not account for multiple queries here
              currID = doc.id
              console.log(doc.id, " => ", doc.data());
          });

          await deleteDoc(doc(db, this.tduser, currID));
          const allDocs = await getDocs(collection(db, this.tduser));
          var lst = []
          allDocs.forEach((doc) => {
              lst.push([doc.id, doc.data()])
          //     this.resetDoc(doc, counter)
          //     counter = counter + 1
          // // doc.data() is never undefined for query doc snapshots
          //     console.log(counter)
              console.log(doc.id, " => ", doc.data().header);
          });
          console.log(lst)
          console.log(lst.length)

          for (let index = 0; index < lst.length; index++) {
              const data = lst[index]
              const userDocRef = doc(db, this.tduser, data[0]);
              // const docSnap = await getDoc(userDocRef)
              await updateDoc(userDocRef, {
                  "header": index+1,
              });
              // console.log(numFruit)
          }
          window.location.reload()






          // const coll = collection(db, this.tduser);
          // const snapshot = await getCountFromServer(coll);
          // this.count = snapshot.data().count
          // this.resetIndex()
          // const querySnapshot = await getDocs(collection(db, this.tduser));
          // var counter = 1
          // querySnapshot.forEach((doc) => {
          //     this.resetDoc(doc, counter)
          //     counter = counter + 1
          // // doc.data() is never undefined for query doc snapshots
          //     console.log(counter)
          //     console.log(doc.id, " => ", doc.data().header);
          // });

      }

  },
  

  mounted() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
          if (user) {
              this.user = user
          }
      })
  },

  beforeMount() {
      // const gridApi = ref(null); // Optional - for accessing Grid's API

      // // Obtain API from grid's onGridReady event
      // const onGridReady = (params) => {
      //     gridApi.value = params.api;
      // };
      
      // const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

      // Each Column Definition results in one Column.
      this.columnDefs = [
          {headerName:"#" , field:"header", editable: false, sortable: true, checkboxSelection: true},
          {headerName:"Todo Item" , field:"item", editable: true, sortable: true, filter: true},
          // {headerName:"Amount" , field:"amount", editable: true, sortable: true, filter: true, type: "numberColumn"},
          {headerName:"Deadline" , field:"date", editable: true, sortable: true, filter: true},
          {headerName:"Status" , field:"status", cellEditorParams: {values : this.status }, editable: true, sortable: true, filter: true, cellEditor: "agSelectCellEditor"},
          {headerName:"Tag" , field:"tag", cellEditorParams: {values : this.tag }, editable: true, sortable: true, filter: true, cellEditor: "agSelectCellEditor"},
          {headerName:"Priority" , field:"priority", cellEditorParams: {values : this.priority }, editable: true, sortable: true, filter: true, cellEditor: "agSelectCellEditor"},
      ],

      this.rowData,
      this.gridApi
  }

  // mounted() {
  //     const auth = getAuth();
  //     onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //             this.user = user;
  //         }
  //     })
  // }
}

</script>

<style>
.TopBar {
  text-align: center;
  background-color: #474e5d;
  color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.170509);
  margin: 5px;
}

.table {
  /* float: right; */
  margin:150;
  width: 100%;
  overflow: hidden;
}

/* .ag-root-wrapper ag-layout-normal ag-ltr {
  float: right;
  margin: 0 1.5%;
  width: 73%;
} */

.ag-theme-alpine {
  /* margin: 1.5%; */
  width: auto;
  height: 400px;
}

.ag-header-cell-label {
 justify-content: center;
}


#addnewRows {
  float: right;
  margin: 2px;
  width: 10%;
  background: #97C1A9;
  background-color: #97C1A9;
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: rgb(255 255 255 / 40%) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  vertical-align:baseline;
  white-space: nowrap;
  border: 2px solid black;
}

#addnewRows:hover,
#addnewRows:focus {
background-color: rgb(27, 138, 75);
}

#addnewRows:focus {
box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

#addnewRows:active {
background-color: rgb(27, 138, 75);
box-shadow: none;
}

#deleteRow {
  float: right;
  margin: 2px;
  width: 0 25%;
  background: #97C1A9;
  background-color: #97C1A9;
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: rgb(255 255 255 / 40%) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
  border: 2px solid black;
}

#deleteRow:hover,
#deleteRow:focus {
background-color: rgb(27, 138, 75);
}

#deleteRow:focus {
box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

#deleteRow:active {
background-color: rgb(27, 138, 75);
box-shadow: none;
}
</style>






<!-- /* eslint-disable vue/no-unused-components */

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
// this.tduser = auth.currentUser.email
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
      tag: ["School", "Wellness", "Others"],
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
            this.tduser = String(user.email)
            const coll = collection(db, this.tduser);
            const snapshot = await getCountFromServer(coll);
            console.log('count: ', snapshot.data().count); // getting the count of documents
            let z = await getDocs(query(collection(db, String(this.tduser))));
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
      this.tduser = String(user.email)
      if (this.newTodo.length === 0) return;
      //if (this.indexEditTodo === null) {
      try {
        const newRow = await addDoc(collection(db, this.tduser + "todolist"), { // change the this.tduser
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
        await setDoc(doc(db, this.tduser, this.todos[this.indexEditTodo].name), {
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
      this.tduser = String(user.email)
      const oldVal = this.todos[index].name;
      //const docRef = doc(db, this.tduser, where("name", "==", oldVal));
      const q = query(collection(db, this.tduser), where("name", "==", oldVal));
      const querySnapshot = await getDocs(q);
      var currID;
      querySnapshot.forEach((doc) => { // did not account for multiple queries here
          currID = doc.id
          console.log(doc.id, " => ", doc.data());
      });
      await setDoc(doc(db, this.tduser, currID), {
          name: oldVal,
          status: this.todos[index].status
      });
      this.indexEditTodo = index;
    },

    async deleteTodo(index) {
      const auth = getAuth();
      const user = auth.currentUser;
      this.tduser = String(user.email)
      const docRef = doc(db, this.tduser, where("name", "==", this.todos[index].name)); 
      await deleteDoc(docRef).then(() => { console.log("Entire Document has been deleted successfully.") }).catch(error => { console.log(error); })
      this.todos.splice(index, 1);
    },

    async changeStatus(index) {
      const auth = getAuth();
      const user = auth.currentUser;
      this.tduser = String(user.email)
      let statusIndex = this.todoStatus.indexOf(this.todos[index].status);
      if (++statusIndex > 2) {
        statusIndex = 0;
      }
      this.todos[index].status = this.todoStatus[statusIndex];
      await setDoc(doc(db, this.tduser, this.todos[index].name), {
          name: this.todos[index].name,
          status: this.todoStatus[statusIndex],
          tag: this.todos[index].tag
      });
    },
    async changeTag(index) {
      const auth = getAuth();
      const user = auth.currentUser;
      this.tduser = String(user.email)
      let tagIndex = this.tag.indexOf(this.todos[index].tag);
      if (++tagIndex > 2) {
        tagIndex = 0;
      }
      this.todos[index].tag = this.tag[tagIndex];
      await setDoc(doc(db, this.tduser, this.todos[index].name), {
          name: this.todos[index].name,
          status: this.todos[index].name,
          tag: this.tag[tagIndex]
      });
    },

    async upTodo(index) {
      const auth = getAuth();
      const user = auth.currentUser;
      this.tduser = String(user.email)
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
      this.tduser = String(user.email)
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
 -->
