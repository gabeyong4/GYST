<template>
    <div class="TopBar">
        <h1>Budget Tracking</h1>
    </div>
    <AgGridVue/>
    <br>
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
    @selection-changed = "onSelectionChanged"
    @row-selected = "onRowSelected">
    </ag-grid-vue>
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
//   import { nextTick } from 'vue';
//   import FullWidthCellRenderer from './fullWidthCellRendererVue.js';


// const auth = getAuth()
// this.fbuser = auth.currentUser.email
//   const email = user.email

  const db = getFirestore(firebaseApp);
//   const renderComponent = ref(true);
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
            rowSelected: [], // the variable we want to make globally in order to use in deleteRow()
            user: false,
            componentKey: 0,
            // renderComponent: true,
            count: 0,
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

        // async forceRerender() {
        //     this.renderComponent = false;
        //     await nextTick();
        //     this.renderComponent = true;
        // },

        async getBudget() {
            // console.log(this.user.email)
            const auth = getAuth();
            const user = auth.currentUser
            this.fbuser = String(user.email)
            // this.fbuser = String(this.user.email)
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
            // console.log(this.user.email)
            this.fbuser = String(this.user.email)
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
            // const oldVal = event.oldValue
            // const columnChanged = event.colDef.field
            // console.log("old val: " + oldVal)
            console.log(event.colDef.field)
            const currData = event.data
            console.log(typeof currData.amount)
            const auth = getAuth();
            const user = auth.currentUser;
            this.fbuser = String(user.email)
            // const q = query(collection(db, this.fbuser), where("tasks", "==", oldVal));
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
        //     this.fbuser = String(user.email)
        //     const querySnapshot = await getDocs(collection(db, this.fbuser));
        //     var counter = 1
        //     querySnapshot.forEach((doc) => {
        //         this.resetDoc(doc, counter)
        //         counter = counter + 1
        //     // doc.data() is never undefined for query doc snapshots
        //         console.log(counter)
        //         console.log(doc.id, " => ", doc.data().header);
        //     });

        //     // await setDoc(doc(db, this.fbuser, currID), {
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
            this.fbuser = String(user.email)
            // const currData = this.rowSelected[0]
            const headSelected = this.rowSelected[0].header
            // const q = query(collection(db, this.fbuser), where("tasks", "==", oldVal));
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
                const userDocRef = doc(db, this.fbuser, data[0]);
                // const docSnap = await getDoc(userDocRef)
                await updateDoc(userDocRef, {
                    "header": index+1,
                });
                // console.log(numFruit)
            }





            // const coll = collection(db, this.fbuser);
            // const snapshot = await getCountFromServer(coll);
            // this.count = snapshot.data().count
            // this.resetIndex()
            // const querySnapshot = await getDocs(collection(db, this.fbuser));
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
            {headerName:"Task Details" , field:"tasks", editable: true, sortable: true, filter: true},
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
}

</script>
  
<style>
.TopBar {
    text-align: center;
    background-color: #474e5d;
    color: white;
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
    height: 500px;
}

.ag-header {
    text-align:center

}

#addnewRows {
    float: left;
    /* margin: 0 59.5%; */
    width: 20%;
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
    vertical-align:baseline;
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
