<template>
  <div class="id-container">
    <div class="header">
        <h1> To Do Goals </h1>
    </div>
    <div class="card-group">
      <div class="card-body">
        <h5 class="card-title">School</h5>
        <div class="progress" style="height: 40px;">
          <div class="progress-bar progress-bar-striped" role="progressbar"  v-bind:style="{ width: ((tagCompletedCounts[0]/tagTotalCounts[0]) * 100) + '%'}" v-bind:aria-valuenow="schoolProgress" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <h5 v-if="tagTotalCounts[0]!=0">{{((tagCompletedCounts[0]/tagTotalCounts[0]) * 100)}} %</h5>
        <h5 v-else> 0% </h5>
      </div>

      <div class="card-body">
        <h5 class="card-title">Wellness</h5>
        <div class="progress" style="height: 40px;">
          <div class="progress-bar progress-bar-striped bg-success" role="progressbar" v-bind:style="{ width: ((tagCompletedCounts[1]/tagTotalCounts[1]) * 100) + '%'}" v-bind:aria-valuenow="((tagCompletedCounts[1]/tagTotalCounts[1]) * 100)" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <h5 v-if="tagTotalCounts[1]!=0">{{((tagCompletedCounts[1]/tagTotalCounts[1]) * 100)}} %</h5>
        <h5 v-else> 0% </h5>
      </div>

      <div class="card-body">
        <h5 class="card-title">CCA</h5>
        <div class="progress" style="height: 40px;">
          <div class="progress-bar progress-bar-striped bg-info" role="progressbar" v-bind:style="{ width: ((tagCompletedCounts[2]/tagTotalCounts[2]) * 100) + '%'}" v-bind:aria-valuenow="((tagCompletedCounts[1]/tagTotalCounts[1]) * 100)" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <h5 v-if="tagTotalCounts[2]!=0">{{((tagCompletedCounts[2]/tagTotalCounts[2]) * 100)}} %</h5>
        <h5 v-else> 0% </h5>      
      </div>

      <div class="card-body">
        <h5 class="card-title">General</h5>
        <div class="progress" style="height: 40px;">
          <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" v-bind:style="{ width: ((tagCompletedCounts[3]/tagTotalCounts[3]) * 100) + '%'}" v-bind:aria-valuenow="((tagCompletedCounts[1]/tagTotalCounts[1]) * 100)" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <h5 v-if="tagTotalCounts[3]!=0">{{((tagCompletedCounts[3]/tagTotalCounts[3]) * 100)}} %</h5>
        <h5 v-else> 0% </h5>     
      </div>
    </div>

    <div class="header">
        <h1> To Do List </h1>
    </div>
    <div class="buttons">
      <button id="addnewRows" v-on:click = "addNewRow();"> Add New Row </button>
      <button id="deleteRow" v-on:click = "deleteRow()">Remove Selected</button>
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
    

  </div>
  
  

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
          count: 0,
          //schoolProgress: 0,
          tagTotalCounts: [0, 0, 0, 0],
          tagCompletedCounts: [0, 0, 0, 0],
          //schoolProgress: (this.tagCompletedCounts[0]/this.tagTotalCounts[0]) * 100*/
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
              if (doc.data().tag == "School") {
                this.tagTotalCounts[0]+=1
                if (doc.data().status == "finished"){
                  this.tagCompletedCounts[0]+=1
                } else if (doc.data().status == "on-going") {
                  this.tagCompletedCounts[0]+=0.5
                }
              }
              if (doc.data().tag == "Wellness") {
                this.tagTotalCounts[1]+=1
                if (doc.data().status == "finished"){
                  this.tagCompletedCounts[1]+=1
                } else if (doc.data().status == "on-going") {
                  this.tagCompletedCounts[1]+=0.5
                }
              }
              if (doc.data().tag == "CCA") {
                this.tagTotalCounts[2]+=1
                if (doc.data().status == "finished"){
                  this.tagCompletedCounts[2]+=1
                } else if (doc.data().status == "on-going") {
                  this.tagCompletedCounts[2]+=0.5
                }
              } 
              if (doc.data().tag == "General") {
                this.tagTotalCounts[3]+=1
                if (doc.data().status == "finished"){
                  this.tagCompletedCounts[3]+=1
                } else if (doc.data().status == "on-going") {
                  this.tagCompletedCounts[3]+=0.5
                }
              }
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
              window.location.reload()
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

<style scoped>

.card-body {
  float:right;
  width: 200px;
  margin: 20px;
}

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


.card-group {
  float: right;
  width: 90%;
  max-width: 1200px;
  margin-right: 20px;
  min-width: 800px;
}

.buttons {
  float: right;
  width: 100%;
  max-width: 1200px;
  /* margin-right: 20px; */
}


.id-container {
    float: right;
    width: 90%;
    max-width: 1200px;
    margin-right: 20px;
    min-width: 800px;
}

.ag-theme-alpine {
  /* margin: 1.5%; */
  width: auto;
  height: 400px;
  /* margin-right: 20px; */
}

.buttons #addnewRows {
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

.buttons #addnewRows:hover,
#addnewRows:focus {
background-color: rgb(27, 138, 75);
}

.buttons #addnewRows:focus {
box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

.buttons #addnewRows:active {
background-color: rgb(27, 138, 75);
box-shadow: none;
}

.buttons #deleteRow {
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

.buttons #deleteRow:hover,
#deleteRow:focus {
background-color: rgb(27, 138, 75);
}

.buttons #deleteRow:focus {
box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

.buttons #deleteRow:active {
background-color: rgb(27, 138, 75);
box-shadow: none;
}

</style>