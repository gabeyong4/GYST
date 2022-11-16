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
            columnDefs: null,
            rowData:[],
            detailCellRendererParams: null,
            categories: ["Transport", "Food & Drinks", "Entertainment", "Clothes", "Vacation"],
            gridApi: null,
            rowSelection: null,
            rowSelected: [], // the variable we want to make globally in order to use in deleteRow()
            user: false,
            componentKey: 0,
            count: 0,
        };
    },

    components: {
        AgGridVue,
    },

    created() {
        this.getBudget();
        this.rowSelection = "single"
    },

    methods: {

        async getBudget() {
            const auth = getAuth();
            const user = auth.currentUser
            this.fbuser = String(user.email) + " Budget Table"
            const coll = collection(db, this.fbuser);
            const snapshot = await getCountFromServer(coll);
            this.count = snapshot.data().count
            console.log('count: ', snapshot.data().count); // getting the count of documents
            let z = await getDocs(query(collection(db, String(this.fbuser))));
            z.forEach((doc) => {
                console.log(doc)
                this.rowData.push(doc.data())
            })
        },

        async addNewRow() {
            this.fbuser = String(this.user.email) + " Budget Table"
            try {
                this.count = this.count + 1
                const newRow = await addDoc(collection(db, this.fbuser), {
                    header: this.count,
                    tasks: "sample",
                    amount:0,
                    date:"sample",
                    category:this.categories[0],
                    comments:"sample"
                });
                console.log(newRow)
                window.location.reload()
            }

            catch(error) {
                console.error("Error adding document ", error)
            }
            
        },

        async save(event) {
            console.log(event.colDef.field)
            const currData = event.data
            console.log(typeof currData.amount)
            const auth = getAuth();
            const user = auth.currentUser;
            this.fbuser = String(user.email) + " Budget Table"
            const q = query(collection(db, this.fbuser), where("header", "==", currData.header));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            var currID;
            querySnapshot.forEach((doc) => { // did not account for multiple queries here
                currID = doc.id
                console.log(doc.id, " => ", doc.data());
            });

            await setDoc(doc(db, this.fbuser, currID), {
                header: currData.header,
                tasks: currData.tasks,
                amount:Number(currData.amount),
                date:currData.date,
                category:currData.category,
                comments:currData.comments
            });
            
        },

        async onRowSelected(event) {
            // store the data that is selected as a variable to use in the delete function
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
            
            // this.test = event.node.data()
            // console.log(this.test)
        },

        // after deletion we need to update the index of the rest of the elements
        async deleteRow() {
            const auth = getAuth();
            const user = auth.currentUser;
            this.fbuser = String(user.email) + " Budget Table"
            const headSelected = this.rowSelected[0].header
            console.log(headSelected)
            const q = query(collection(db, this.fbuser), where("header", "==", headSelected));
            const querySnapshot = await getDocs(q);
            var currID;
            querySnapshot.forEach((doc) => { // did not account for multiple queries here
                currID = doc.id
                console.log(doc.id, " => ", doc.data());
            });

            await deleteDoc(doc(db, this.fbuser, currID));
            const allDocs = await getDocs(collection(db, this.fbuser));
            var lst = []
            allDocs.forEach((doc) => {
                lst.push([doc.id, doc.data()])
                console.log(doc.id, " => ", doc.data().header);
            });
            console.log(lst)
            console.log(lst.length)

            for (let index = 0; index < lst.length; index++) {
                const data = lst[index]
                const userDocRef = doc(db, this.fbuser, data[0]);
                await updateDoc(userDocRef, {
                    "header": index+1,
                });
            }
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
        this.columnDefs = [
            {headerName:"#" , field:"header", editable: false, sortable: true, checkboxSelection: true},
            {headerName:"Task Details" , field:"tasks", editable: true, sortable: true, filter: true},
            {headerName:"Amount" , field:"amount", editable: true, sortable: true, filter: true, type: "numberColumn"},
            {headerName:"Date" , field:"date", editable: true, sortable: true, filter: true},
            {headerName:"Category" , field:"category", cellEditorParams: {values : this.categories }, editable: true, sortable: true, filter: true, cellEditor: "agSelectCellEditor"},
            {headerName:"Comments" , field:"comments", editable: true, sortable: true, filter: true}
        ],

        this.rowData,
        this.gridApi
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
