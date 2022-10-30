<template>
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
</template>

<script>
import { useStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
export default {
    name: "TodoGoal",
    data() {
        return {
            newGoal: ''
        }
    },
    props: {
        location: String
    },
    setup() {
        const store = useStore()
        return {
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

        deleteGoal: function(e) {
            this.$store.commit('deleteGoal', {
                id: e.currentTarget.getAttribute('data-id')
            })
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

.goal-options {
    display: flex;
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

.delete-goal:hover{
    background: #ddd;
    color: black;
}
</style>