<template>
    <AgGridVue/>
    <button @click="deselectRows">deselect rows</button>
    <ag-grid-vue
    class="ag-theme-alpine"
    :columnDefs = "columnDefs"
    :rowData = "rowData"
    :gridOptions="gridOptions"
    >
    </ag-grid-vue>
</template>
  
<script>
  import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
//   import { reactive } from "vue";
  import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
  import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

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
            rowData:null
        };
    },

    components: {
        AgGridVue,
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
            {headerName:"Task Details" , field:"tasks", editable: true, sortable: true, filter: true},
            {headerName:"Amount" , field:"amount", editable: true, sortable: true, filter: true},
            {headerName:"Date" , field:"date", editable: true, sortable: true, filter: true},
            {headerName:"Category" , field:"category", editable: true, sortable: true, filter: true},
            {headerName:"Comments" , field:"comments", editable: true, sortable: true, filter: true}
        ];

        this.rowData = [
            {tasks:"Poker" , amount:20, date: "1/4/2020", category: "Gambling", comments: "NIL"},
            {tasks:"food" , amount:10, date: "4/1/2020", category: "Food", comments: "KFC"},
            {tasks:"Mahjong" , amount:90, date: "1/1/2020", category: "Transport", comments: "NIL"}
        ];
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

</style>