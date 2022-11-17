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
          columnDefs: null, // the column characteristics => e.g. fields, headerName, whether it is sortable etc
          rowData:[], // the data for each row
          status: ["to-do", "on-going", "finished"], // the status the user can select from under the "Status" column
          tag: ["School", "Wellness", "CCA", "General"], // the tags the user can select from under the "Tag" column
          priority: ["High", "Medium", "Low"], // the priority the user can select from under the "Priority" column
          rowSelection: null, // AG-Grid feature => allows you to choose whether you want single or multiple rows to be selected 
          rowSelected: [], // the variable we want to make globally in order to use in deleteRow()
          user: false,
          count: 0, // to keep track of the total number of documents within firebase under the user for index assignment
          tagTotalCounts: [0, 0, 0, 0],
          tagCompletedCounts: [0, 0, 0, 0],
      };
  },

  components: {
      AgGridVue,
  },

  created() {
      this.getToDoLst(); // Retrieving the To-Do List from firebase during this lifecycle
      this.rowSelection = "single" // Limit the selection to only 1 row at a time
  },

  methods: {
      // Objective: 
      // To retrieve the To-Do list documents from firebase & display within AG-Grid
      async getToDoLst() {
          const auth = getAuth();
          const user = auth.currentUser
          // the collection key for the user for the to do list table
          this.tduser = String(user.email) + " To Do List"
          // Retrieval of all the documents under this user for the to do list table
          const coll = collection(db, this.tduser);
          const snapshot = await getCountFromServer(coll);
          this.count = snapshot.data().count
          console.log('count: ', snapshot.data().count); // getting the count of documents
          let z = await getDocs(query(collection(db, String(this.tduser))));
          // For each document, push all the document fields into the AG-Grid
          // update the tagTotalCount accordingly for the progress bar image
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

      // Objective:
        // Adding a new document into a firebase and displaying the new row of data on the AG-Grid 
      async addNewRow() {
        // the collection key for the user for the to do list table
          this.tduser = String(this.user.email) + " To Do List"
          console.log(this.tduser)
          try {
              this.count = this.count + 1
              // add a new document into firebase
              const newRow = await addDoc(collection(db, this.tduser), {
                  header: this.count,
                  item: "sample",
                  date:"sample",
                  status: this.status[0],
                  tag: this.tag[0],
                  priority: this.priority[0]
              });
              console.log(newRow)
              // reload the page to show the new changes
              window.location.reload()
          }

          catch(error) {
              console.error("Error adding document ", error)
          }
          
      },

      // Objective:
      // To update the data with the new changes made on the AG-Grid (which is the event)
      // Display the new changes on the AG-Grid
      async save(event) {
          console.log(event.colDef.field)
          // the new data
          const currData = event.data
          console.log(typeof currData.amount)
          const auth = getAuth();
          const user = auth.currentUser;
          // the collection key for the user for the to do list table
          this.tduser = String(user.email) + " To Do List"
          // Retrieving the document that the changes has been made on
          const q = query(collection(db, this.tduser), where("header", "==", currData.header));
          const querySnapshot = await getDocs(q);
          console.log(querySnapshot)
          var currID;
          // Storing the document that has been updated Unique ID
          querySnapshot.forEach((doc) => { // did not account for multiple queries here
              currID = doc.id
              console.log(doc.id, " => ", doc.data());
          });
          // Updating operation 
          await setDoc(doc(db, this.tduser, currID), {
              header: currData.header,
              item: currData.item,
              date: currData.date,
              status: currData.status,
              tag: currData.tag,
              priority:currData.priority
          });
      },

      // To store the selected data from clicking the checkbox in AG-Grid
      async onRowSelected(event) {
        if (this.rowSelected.length == 0) { // if this.row already has 1
            this.rowSelected.push(event.node.data)
            console.log(this.rowSelected)
        } else if (this.rowSelected.length == 1) {
            this.rowSelected.push(event.node.data)
            console.log(this.rowSelected)
        } else { // lst has 2 elements 
            this.rowSelected.shift()
            console.log(this.rowSelected)
        }
      },

      // after deletion we need to update the index of the rest of the elements
      async deleteRow() {
          const auth = getAuth();
          const user = auth.currentUser;
          this.tduser = String(user.email) + " To Do List" // the collection key for the user for the to do list table
          const headSelected = this.rowSelected[0].header // getting the index of the row that we have selected
          const q = query(collection(db, this.tduser), where("header", "==", headSelected)); // Querying that document from firebase
          // Retrieving the unique document ID of the document we want to delete
          const querySnapshot = await getDocs(q);
          var currID;
          querySnapshot.forEach((doc) => { 
              currID = doc.id
              console.log(doc.id, " => ", doc.data());
          });

          await deleteDoc(doc(db, this.tduser, currID)); // deleting the document that we have selected from firebase
          // keeping the remaining the document ID in the list
          const allDocs = await getDocs(collection(db, this.tduser));
          var lst = []
          allDocs.forEach((doc) => {
              lst.push([doc.id, doc.data()])
              console.log(doc.id, " => ", doc.data().header);
          });
          console.log(lst)
          console.log(lst.length)
          // Resetting the index for all the documents 
          for (let index = 0; index < lst.length; index++) {
              const data = lst[index]
              const userDocRef = doc(db, this.tduser, data[0]);
              await updateDoc(userDocRef, {
                  "header": index+1,
              });
          }
          // Refreshing the browser so that it displays on the AG-Grid
          window.location.reload()
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

      // Each Column Definition results in one Column.
      // Each Column has its own field and attributes
      this.columnDefs = [
          {headerName:"#" , field:"header", editable: false, sortable: true, checkboxSelection: true},
          {headerName:"Todo Item" , field:"item", editable: true, sortable: true, filter: true},
          {headerName:"Deadline" , field:"date", editable: true, sortable: true, filter: true},
          {headerName:"Status" , field:"status", cellEditorParams: {values : this.status }, editable: true, sortable: true, filter: true, cellEditor: "agSelectCellEditor"},
          {headerName:"Tag" , field:"tag", cellEditorParams: {values : this.tag }, editable: true, sortable: true, filter: true, cellEditor: "agSelectCellEditor"},
          {headerName:"Priority" , field:"priority", cellEditorParams: {values : this.priority }, editable: true, sortable: true, filter: true, cellEditor: "agSelectCellEditor"},
      ],

      this.rowData
  }

}

</script>

<style scoped>

.card-body {
  float:right;
  width: 200px;
  margin: 20px;
}

.header {
    color: white;
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
}


.id-container {
    float: right;
    width: 90%;
    max-width: 1200px;
    margin-right: 20px;
    min-width: 800px;
}

.ag-theme-alpine {
  width: auto;
  height: 400px;
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