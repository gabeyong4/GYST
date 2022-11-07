<template>
    <AgGridVue/>
    <button id="addnewRows" v-on:click = "addNewRow();"> Add New Row </button>
    <button id="deleteRow" v-on:click = "deleteRow()">Remove Selected</button>
    <!-- <button non="deselectRows">deselect rows</button> -->
    <ag-grid-vue
    :key="componentKey"
    class="ag-theme-alpine"
    :columnDefs = "columnDefs"
    :rowData = "rowData"
    :rowSelection="rowSelection"
    @cell-value-changed = "save"
    @selection-changed="onSelectionChanged"
    @row-selected="onRowSelected"
    >
    </ag-grid-vue>
</template>
  
<script>
  import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
//   import { reactive } from "vue";
  import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
  import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
  import firebaseApp from "../firebase.js";
  import {getFirestore} from "firebase/firestore";
  import {addDoc, collection, getDocs, query, getCountFromServer, where, setDoc, doc} from "firebase/firestore"; // , doc, deleteDoc, setDoc
  import { getAuth, onAuthStateChanged } from "@firebase/auth";
//   import { ref } from "vue"

// const auth = getAuth()
// this.fbuser = auth.currentUser.email
//   const email = user.email

  const db = getFirestore(firebaseApp);
  /* eslint-disable no-unused-vars */
//   const componentKey = ref(0)
  /* eslint-enable no-unused-vars */
  
// var inputRow = {};
// var gridOptions = {
//     pinnedTopwRowData: [inputRow]
// }

//   let inputRow = {}

//   function setInputRow(newData) {
//     inputRow = newData;
//     gridOptions.api.setPinnedTopRowData([inputRow]);
//   }

  
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
            rowSelected: null, // the variable we want to make globally in order to use in deleteRow()
            user: false,
            componentKey: 0
        };
    },

    components: {
        AgGridVue,
    },

    created() {
        // this.createCollection()
        this.getBudget();
        this.rowSelection = "single"
    },

    methods: {
        // async getEmail() {
        //     const auth = getAuth();
        //     const user = auth.currentUser;
        //     const email = user.email
        // },
        // forceRerender() {
        //     this.componentKey += 1
        // },

        // methodThatForcesUpdate() {
        // // ...
        //     this.$forceUpdate();  // Notice we have to use a $ here
        // // ...
        // },

        async getBudget() {
            // console.log(this.user.email)
            const auth = getAuth();
            const user = auth.currentUser
            this.fbuser = String(user.email)
            // this.fbuser = String(this.user.email)
            const coll = collection(db, this.fbuser);
            const snapshot = await getCountFromServer(coll);
            console.log('count: ', snapshot.data().count); // getting the count of documents
            let z = await getDocs(query(collection(db, String(this.fbuser))));
            z.forEach((doc) => {
                console.log(doc)
                this.rowData.push(doc.data())
            })
        },

        async addNewRow() {
            // console.log(this.user.email)
            this.fbuser = String(this.user.email)
            try {
                const newRow = await addDoc(collection(db, this.fbuser), {
                    tasks: "sample",
                    amount:0,
                    date:"sample",
                    category:"sample",
                    comments:"sample"
                });
                console.log(newRow)
                // this.forceRerender()
                // this.methodThatForcesUpdate()
                // this.forceRerender()
                // alert("refresh")
                // console.log(this.componentKey)
                // this.$router.go()
                // window.location.reload()
                // this.$emit("added")
            }

            catch(error) {
                console.error("Error adding document ", error)
            }
            
        },

        async save(event) {
            const oldVal = event.oldValue
            const columnChanged = event.colDef.field
            console.log("old val: " + oldVal)
            // console.log(event.colDef.field)
            const currData = event.data
            console.log(typeof currData.amount)
            const auth = getAuth();
            const user = auth.currentUser;
            this.fbuser = String(user.email)
            // const q = query(collection(db, this.fbuser), where("tasks", "==", oldVal));
            const q = query(collection(db, this.fbuser), where(columnChanged, "==", oldVal));
            const querySnapshot = await getDocs(q);
            var currID;
            querySnapshot.forEach((doc) => { // did not account for multiple queries here
                currID = doc.id
                console.log(doc.id, " => ", doc.data());
            });

            await setDoc(doc(db, this.fbuser, currID), {
                tasks: currData.tasks,
                amount:Number(currData.amount),
                date:currData.date,
                category:currData.category,
                comments:currData.comments
            });
            

            // console.log('onCellValueChanged: ' + event.oldValue + ' to ' + event.newValue + " ")

        },

        async onRowSelected(event) {
            // store the data that is selected as a variable to use in the delete function
            this.rowSelected = event.node
            console.log(this.rowSelected)
            
            // event.node.forEach((x) => {
            //     console.log(x)
            //     // this.rowData.push(doc.data())
            // })
    
            // var counter = 0
            // if (event.node.isSelected() && counter == 0) {
            //     counter++
            // }

            // console.log(event.node.isSelected())

            // window.alert(
            //     'row ' +
            //     event.node.data.tasks +
            //     ' selected = ' +
            //     event.node.isSelected()
            // );
        },

        async deleteRow() {
            console.log(this.rowSelected)
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
            {headerName:"Task Details" , field:"tasks", editable: true, sortable: true, filter: true, checkboxSelection: true},
            {headerName:"Amount" , field:"amount", editable: true, sortable: true, filter: true, type: "numberColumn"},
            {headerName:"Date" , field:"date", editable: true, sortable: true, filter: true},
            {headerName:"Category" , field:"category", cellEditorParams: {values : this.categories }, editable: true, sortable: true, filter: true, cellEditor: "agSelectCellEditor"},
            {headerName:"Comments" , field:"comments", editable: true, sortable: true, filter: true}
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

        // DefaultColDef sets props common to all Columns
        // const defaultColDef = {
        //     sortable: true,
        //     filter: true,
        //     flex: 1
        // };

        // Example load data from sever
        // onMounted(() => {
        //     fetch("https://www.ag-grid.com/example-assets/row-data.json")
        //     .then((result) => result.json())
        //     .then((remoteRowData) => (rowData.value = remoteRowData));
        // });

        // return {
        //     // onGridReady,
        //     columnDefs,
        //     rowData,
        //     defaultColDef,
        //     cellWasClicked: (event) => { // Example of consuming Grid Event
        //     console.log("cell was clicked", event);
        //     }
        //     // deselectRows: () =>{
        //     // gridApi.value.deselectAll()
        //     // }
        // }
}

</script>
  
<style>

.table {
    float: right;
    margin: 0 1.5%;
    width: 73%;
}

/* .ag-root-wrapper ag-layout-normal ag-ltr {
    float: right;
    margin: 0 1.5%;
    width: 73%;
} */

.ag-theme-alpine {
    float: right;
    margin: 0 1.5%;
    width: 73%;
    height: 500px;
}

.ag-header {
    text-align:left

}

#addnewRows {
    float: right;
    margin: 0 59.5%;
    width: 15%;
    background: #2178C0;
    background-color: #0095ff;
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
}

#addnewRows:hover,
#addnewRows:focus {
  background-color: #07c;
}

#addnewRows:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

#addnewRows:active {
  background-color: #0064bd;
  box-shadow: none;
}

#deleteRow {
    float: right;
    margin: 0 59.5%;
    width: 15%;
    background: #2178C0;
    background-color: #0095ff;
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
}

#deleteRow:hover,
#deleteRow:focus {
  background-color: #07c;
}

#deleteRow:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

#deleteRow:active {
  background-color: #0064bd;
  box-shadow: none;
}
</style>
