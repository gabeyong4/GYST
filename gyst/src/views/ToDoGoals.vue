<template>
    <SideNavBar/>
    <div id="new-goal">
        <input type="text" placeholder="Add a new goal.." id="new-goal-input" @keyup="updateGoal" />
        <input type="submit" id="new-goal-submit" @click="addGoal" value="Add Goal" />
    </div>
    <div id = "goals">
        <div class = "goal-item" v-for="n in goals" :key="n.id">
            <div class ="goal-item-holder" v-if="n.location==location" :data-status="n.completed">
                <div class = "goal-items" :data-status="n.completed"></div>
                <div class="goal-options">
                    <div class="delete-goal" @click="deleteGoal" :data-id="n.id">Delete</div>
                </div>
            </div>
        </div>                       
    </div>
    <div id="todo-list">
        <h1>All Tasks</h1>
        <div class="list-item" v-for="n in todos" :key="n.id">
            <div class="list-item-holder" v-if="n.location == location" :data-status="n.completed">
                <div class="checkbox-items" :data-status="n.completed">
                    <input type="checkbox" :data-id="n.id" :id="n.id" @click="updateTodo" :checked="n.completed" /> <label :data-id="n.id" :for="n.id" >{{ n.name }}</label>
                </div>
                <div class="item-options">
                    <div class="delete-item" @click="deleteItem" :data-id="n.id">Delete</div>
                    <div class="archive-item" v-if="n.location !== 'archive'" @click="archiveItem" :data-id="n.id">Archive</div>
                </div>
            </div>
        </div>
        <div id="new-todo-list-item">
            <input type="text" placeholder="Add a new item.." id="new-todo-list-item-input" @keyup="updateItemText" />
            <input type="submit" id="new-todo-list-item-submit" @click="newItem" value="Add To Do List Item" />
        </div>
    </div>
    <LogOut/>
</template>

<script>
import { useStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import SideNavBar from '@/components/SideNavBar.vue';
import LogOut from '@/components/LogOut.vue';

export default {
    name: "TodoGoals",
    components: { SideNavBar, LogOut },
    data() {
        return {
            newTodoItem: '',
            newGoal: ''
        }
    },
    props: {
        location: String
    },
    setup() {
        const store = useStore()
        return {
            todos: store.getters.todos,
            goals:store.getters.goals,
        }
    },
    methods: {
        updateGoal: function(e) {
            this.newGoal = e.currentTarget.value;
            if(e.keyCode === 13) {
                this.addGoal();
            }
            return false;
        },

        updateItemText: function(e) {
            this.newTodoItem = e.currentTarget.value;
            if(e.keyCode === 13) {
                this.newItem();
            }
            return false;
            
        },
        updateTodo: function(e) {
            let newStatus = e.currentTarget.parentElement.getAttribute('data-status') == "true" ? false : true;
            this.$store.commit('updateTodo', {
                id: e.currentTarget.getAttribute('data-id'),
                completed: newStatus
            })
        },
        deleteItem: function(e) {
            this.$store.commit('deleteTodo', {
                id: e.currentTarget.getAttribute('data-id')
            })
        },
        deleteGoal: function(e) {
            this.$store.commit('deleteGoal', {
                id: e.currentTarget.getAttribute('data-id')
            })
        },

        newItem: function() {
            if(this.newTodoItem !== '') {
                this.$store.commit('addTodo', {
                    id: uuidv4(),
                    name: this.newTodoItem,
                    completed: false
                })
            }
        },

        addGoal: function() {
            if(this.newGoal !== '') {
                this.$store.commit('addGoal', {
                    id: uuidv4(),
                    name: this.newGoal,
                    completed: false
                })
            }
        },
        archiveItem: function(e) {
            this.$store.commit('moveTodoItem', {
                id: e.currentTarget.getAttribute('data-id'),
                location: 'archive'
            })
        }
    }
}
</script>
<style scoped>
#new-goal {
    padding: 1rem;
}

#new-goal input[type="text"] {
    margin: 0 0 1rem 0;
}
#new-goal input[type="submit"] {
    margin: 0 0 1rem 0;
}

#todo-list {
    /*float: right;
    margin: 0 1.5%;
    border-radius: 14px;
    max-width: 400px;
    border: 2px solid #ddd;*/
    top: 500px;
    left: 450px;
    width: 1189px;
    height: 500px;
    position: absolute;
    border-color: rgba(223, 224, 235, 1);
    border-style: solid;
    border-width: 1px;
    border-radius: 8px;
}
#goals {
    top: 94px;
    left: 351px;
    width: 1027px;
    height: 311px;
    display: flex;
    padding: 0;
    position: absolute;
    align-self: auto;
    box-sizing: border-box;
    align-items: flex-start;
    flex-shrink: 1;
    border-color: transparent;
    border-style: none;
    border-width: 0;
    margin-right: 0;
    border-radius: 0px 0px 0px 0px;
    margin-bottom: 0;
    flex-direction: row;
    justify-content: flex-start;
    background-color: transparent;
}
.list-item-holder {
    float: right;
    margin: 0 1.5%;
    display: flex;
    padding: 1rem 1rem;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
}
.goal-item-holder {
    /*display: flex;
    padding: 1rem 1rem;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;*/
    top: 0px;
    left: 0px;
    width: 271px;
    height: 311px;
    position: absolute;
    border-color: rgba(150, 150, 150, 1);
    border-radius: 15px;
}
.item-options, .item-checkbox  {
    display: flex;
}
.goal-options {
    display: flex;
}
#new-todo-list-item {
    top: 600px;
    float: right;
    margin: 0 1.5%;
    padding: 1rem;
}
#new-todo-list-item input[type="text"] {
    margin: 0 0 1rem 0;
}
.delete-item, .archive-item {
    font-size: 0.875rem;
    background: #eee;
    margin: 0 0 0 0.5rem;
    height: 1rem;
    border-radius: 100px;
    transition: all 0.1s ease-out;
    color: rgba(0,0,0,0.5);
    cursor: pointer;
    padding: 0.25rem 0.75rem;
}
.delete-goal {
    font-size: 0.875rem;
    background: #eee;
    margin: 0 0 0 0.5rem;
    height: 1rem;
    border-radius: 100px;
    transition: all 0.1s ease-out;
    color: rgba(0,0,0,0.5);
    cursor: pointer;
    padding: 0.25rem 0.75rem;
}
.checkbox-items {
    display: flex;
    align-items: center;
}
.delete-item:hover, .archive-item:hover {
    background: #ddd;
    color: black;
}
.delete-goal:hover{
    background: #ddd;
    color: black;
}
[data-status="false"] label {
    color: #0428ff;
    font-weight: 600;
}
[data-status="true"] label {
    text-decoration: line-through;
}
</style>

