// eslint-disable-next-line no-unused-vars
import { createApp } from 'vue' // Put Vue if needed
//import { createStore } from 'vuex'
import App from './App.vue';
import router from './router/index.js';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line no-unused-vars
// import VueEditortable from "vue-editortable"

import "@fortawesome/fontawesome-free/js/all"

// import { BootstrapVue } from 'bootstrap-vue'
// import "bootstrap/dist/css/bootstrap.css"
// import 'bootstrap-vue/dist/bootstrap-vue.css'
createApp(App).use(router).use(BootstrapIconsPlugin).mount('#app')

// import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

// Vue.use(BootstrapVue)

// Vue.use(IconsPlugin)

//const app = createApp(App)
// .component("font-awesome-icon", FontAwesomeIcon)
// .mount("#app")

// const methodThatForcesUpdate = () => {
//     // ...
//     const instance = getCurrentInstance();
//     instance.proxy.forceUpdate();
//     // ...
// };

// export default methodThatForcesUpdate

// Create a store for our to do list items
/*const store = createStore({
    state () {
        return {
            todos: [
                // id<String> can be any unique ID
                // name<String> is the name of our item
                // completed<Boolean> is set to true when done, false when not
                // location<['home', 'archive']> is set to home or archive depending on which page we want to show it on
                { id: 'first-element', name: 'My First To Do Item', completed: false, location: 'toDoGoals' }
            ],
            goals: [
                { id: 'first-goal', name: 'My First Goal', completed: false, location:'toDoGoals'}
            ]
        }
    },
    getters: {
        todos (state) {
            return state.todos;
        },
        goals(state){
            return state.goals;
        }
    },
    mutations: {
		loadStore() {
			if(localStorage.getItem('store')) {
                try {
                    this.replaceState(JSON.parse(localStorage.getItem('store')));
                }
                catch(e) {
                    console.log('Could not initialize store', e);
                }
			}
		},
        updateTodo (state, todoItem) {
            let id = todoItem.id;
            let completed = todoItem.completed;
            let name = todoItem.name;
            let findEl = state.todos.find((x) => x.id == id);
            if(findEl !== null) {
                if(completed !== undefined) {
                    findEl.completed = completed;
                }
                if(name !== undefined) {
                    findEl.name = name;
                }
            }
            else {
                console.log(`To Do List Item ${id} couldn't be found`);
            }
        },
        addTodo (state, todoItem) {
            if(todoItem.id !== undefined && typeof todoItem.name == 'string' && typeof todoItem.completed == 'boolean') {
                state.todos.push({
                    id: todoItem.id,
                    name: todoItem.name,
                    completed: todoItem.completed,
                    location: 'toDoGoals'
                })
            }
        },

        addGoal(state, newGoal) {
            if(newGoal.id !== undefined && typeof newGoal.name == 'string' && typeof newGoal.completed == 'boolean') {
                state.goals.push({
                    id: newGoal.id,
                    name: newGoal.name,
                    completed: newGoal.completed,
                    location: 'toDoGoals'
                })
            }
        },

        deleteTodo (state, todoItem) {
            let id = todoItem.id;
            let removedEl = state.todos.findIndex((x) => x.id == id);
            if(removedEl !== null) {
                state.todos.splice(removedEl, 1);
            }
        },

        deleteGoal(state, goal) {
            let id = goal.id;
            let removedEl = state.goals.findIndex((x) => x.id == id);
            if(removedEl !== null) {
                state.goals.splice(removedEl, 1);
            }
        },
        moveTodoItem (state, todoItem) {
            let id = todoItem.id;
            let location = todoItem.location;
            let findEl = state.todos.find((x) => x.id == id);
            if(findEl !== null) {
                findEl.location = location;
            }
            else {
                console.log(`To Do List Item ${id} couldn't be found`);
            }
        }
    }
});
store.subscribe((_mutation, state) => {
    // The code inside the curly brackets fires any time a mutation occurs.
    // When a mutation occurs, we'll stringify our entire state object - which
    // contains our todo list. We'll put it in the users localStorage, so that
    // their data will persist even if they refresh the page.
	localStorage.setItem('store', JSON.stringify(state));
})
*/
//app.use(router).use(store).mount('#app')
