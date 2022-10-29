<template>
    <AgGridVue/>
    <button id="addnewRows" v-on:click = "addNewRow(); redrawAllRows();"> Add New Row </button>
    <button non="deselectRows">deselect rows</button>
    <ag-grid-vue
    class="ag-theme-alpine"
    :columnDefs = "columnDefs"
    :rowData = "rowData"
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
  import {collection, getDocs, query, setDoc, doc} from "firebase/firestore"; // , doc, deleteDoc

  const db = getFirestore(firebaseApp);
  

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
            detailCellRendererParams: null
        };
    },

    components: {
        AgGridVue,
    },

    created() {
        this.getBudget();
        
    },

    methods: {
        async getBudget() {
            let z = await getDocs(query(collection(db, "Budget Tasks")));

            z.forEach((doc) => {
                this.rowData.push(doc.data())
            })
        },

        async addNewRow() {
            try {
                const newRow = await setDoc(doc(db, "Budget Tasks", "1234556"),{
                task: "",
                amount:0,
                date:"",
                category:"",
                comments:""
            })
                console.log(newRow)
                alert("refresh")
                this.$router.go()
                // document.getElementById("myform").reset();
                this.$emit("added")
            }

            catch(error) {
                console.error("Error adding document ", error)
            }
            
        }
    },
    

    // mounted() {
    //     async function display() {
    //         let z = await getDocs(collection(db, "Budget"))
    //         print(z)
    //     }
    // },

    beforeMount() {
        // const gridApi = ref(null); // Optional - for accessing Grid's API

        // // Obtain API from grid's onGridReady event
        // const onGridReady = (params) => {
        //     gridApi.value = params.api;
        // };
        
        // const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

        // Each Column Definition results in one Column.
        this.columnDefs = [
            {headerName:"Task Details" , field:"tasks", editable: true, sortable: true, filter: true},
            {headerName:"Amount" , field:"amount", editable: true, sortable: true, filter: true},
            {headerName:"Date" , field:"date", editable: true, sortable: true, filter: true},
            {headerName:"Category" , field:"category", editable: true, sortable: true, filter: true},
            {headerName:"Comments" , field:"comments", editable: true, sortable: true, filter: true}
        ],

        this.rowData
    }

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
</style>
