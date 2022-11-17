<template>
    <div class="budget-container">
        <div id="header">
            <h1>Budget Tracking</h1>
        </div>
        <div class="buttons">
            <button id="addnewRows" v-on:click = "addNewRow();"> Add New Row </button>
            <button id="deleteRow" v-on:click = "deleteRow()">Remove Selected</button>
        </div>
        <AgGridVue/>
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
  import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
  import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
  import firebaseApp from "../firebase.js";
  import {getFirestore} from "firebase/firestore";
  import {deleteDoc, addDoc, collection, getDocs, query, getCountFromServer, where, doc, setDoc, updateDoc} from "firebase/firestore"; 
  import { getAuth, onAuthStateChanged } from "@firebase/auth";

  const db = getFirestore(firebaseApp); // Firestore Database
  
  export default {
    name: "App",
    
    data() {
        return {
            columnDefs: null, // the column characteristics => e.g. fields, headerName, whether it is sortable etc
            rowData:[], // the data for each row
            categories: ["Transport", "Food & Drinks", "Entertainment", "Clothes", "Vacation"], // the categories the user can select from under the "Category" column
            rowSelection: null, // AG-Grid feature => allows you to choose whether you want single or multiple rows to be selected 
            rowSelected: [], // the variable we want to make globally in order to use in deleteRow()
            user: false,
            count: 0, // to keep track of the total number of documents within firebase under the user for index assignment
        };
    },

    components: {
        AgGridVue,
    },

    created() {
        this.getBudget();  // Retrieving the Budget Tracking List from firebase during this lifecycle
        this.rowSelection = "single" // Limit the selection to only 1 row at a time
    },

    methods: {
        // Objective: 
        // To retrieve the budget tracking list documents from firebase & display within AG-Grid
        async getBudget() {
            const auth = getAuth();
            const user = auth.currentUser
            // the collection key for the user for the budget tracking table
            this.fbuser = String(user.email) + " Budget Table" 
            // Retrieval of all the documents under this user for the budget tracking table
            const coll = collection(db, this.fbuser);
            const snapshot = await getCountFromServer(coll);
            this.count = snapshot.data().count
            console.log('count: ', snapshot.data().count); // getting the count of documents
            let z = await getDocs(query(collection(db, String(this.fbuser))));
            // For each document, push all the document fields into the AG-Grid
            z.forEach((doc) => {
                console.log(doc)
                this.rowData.push(doc.data())
            })
        },

        // Objective:
        // Adding a new document into a firebase and displaying the new row of data on the AG-Grid 
        async addNewRow() {
            // the collection key for the user for the budget tracking table
            this.fbuser = String(this.user.email) + " Budget Table"
            try {
                // updating the new total count of documents in firebase under this users collection key
                this.count = this.count + 1
                // add a new document into firebase
                const newRow = await addDoc(collection(db, this.fbuser), {
                    header: this.count,
                    tasks: "sample",
                    amount:0,
                    date:"sample",
                    category:this.categories[0],
                    comments:"sample"
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
            // the collection key for the user for the budget tracking table
            this.fbuser = String(user.email) + " Budget Table"
            // Retrieving the document that the changes has been made on
            const q = query(collection(db, this.fbuser), where("header", "==", currData.header));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            var currID;
            // Storing the document that has been updated Unique ID
            querySnapshot.forEach((doc) => { 
                currID = doc.id
                console.log(doc.id, " => ", doc.data());
            });
            // Updating operation 
            await setDoc(doc(db, this.fbuser, currID), {
                header: currData.header,
                tasks: currData.tasks,
                amount:Number(currData.amount),
                date:currData.date,
                category:currData.category,
                comments:currData.comments
            });
            
        },

        // To store the selected data from clicking the checkbox in AG-Grid
        async onRowSelected(event) {
            // store the data that is selected as a variable to use in the delete function
            if (this.rowSelected.length == 0) { // if this.row already has 1
                this.rowSelected.push(event.node.data)
                console.log(this.rowSelected)
            } else if (this.rowSelected.length == 1) { // lst has 1 item
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
            this.fbuser = String(user.email) + " Budget Table" // the collection key for the user for the to budget tracking table
            const headSelected = this.rowSelected[0].header // getting the index of the row that we have selected
            console.log(headSelected)
            const q = query(collection(db, this.fbuser), where("header", "==", headSelected)); // Querying that document from firebase
            // Retrieving the unique document ID of the document we want to delete
            const querySnapshot = await getDocs(q);
            var currID;
            querySnapshot.forEach((doc) => { 
                currID = doc.id
                console.log(doc.id, " => ", doc.data());
            });
            
            await deleteDoc(doc(db, this.fbuser, currID)); // deleting the document that we have selected from firebase
            // keeping the remaining the document ID in the list
            const allDocs = await getDocs(collection(db, this.fbuser));
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
                const userDocRef = doc(db, this.fbuser, data[0]);
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
            {headerName:"Task Details" , field:"tasks", editable: true, sortable: true, filter: true},
            {headerName:"Amount" , field:"amount", editable: true, sortable: true, filter: true, type: "numberColumn"},
            {headerName:"Date" , field:"date", editable: true, sortable: true, filter: true},
            {headerName:"Category" , field:"category", cellEditorParams: {values : this.categories }, editable: true, sortable: true, filter: true, cellEditor: "agSelectCellEditor"},
            {headerName:"Comments" , field:"comments", editable: true, sortable: true, filter: true}
        ],
        this.rowData
    }
}

</script>
  
<style scoped>
.buttons {
  float: right;
  width: 100%;
  max-width: 1200px;
}


#header {
    color: white;
    float: right;
    width: 100%;
    max-width: 1200px;
    background-color: #474e5d;
  }


.budget-container {
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

.ag-header-cell-label {
   justify-content: center;
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
