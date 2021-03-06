import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [],
        loading: true
    },
    mutations: {
        setTodos (state, listaDeTodos) {
            state.todos = listaDeTodos
        },
        setChangeTodo(state, task) {
            state.todos.forEach(element => {
                if (element.id === task.id) {
                    element.completed = !element.completed
                }
            });
        },
        setLoading(state, booleanValue) {
            state.loading = booleanValue
        }
    },
    actions: {
        
        async loadTodos ( { dispatch, commit, state } ) {
            
            if (state.todos.length) { return }
           
            // dispatch('loadingOn') // dispatch > chama actions
            commit('setLoading', true);
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                commit('setTodos', response.data);
            } catch (error) {
                console.log(error.response);
            }
            commit('setLoading', false);
        },

        changeTodo ({ commit }, task) {
            commit('setLoading', true);
            setTimeout(() => {
                commit('setChangeTodo', task);
                commit('setLoading', false);
            }, 750);
        },

    },
    getters: {
        todoCount(state) {
            return state.todos.length
        },
        getAllTodos(state) {
            let listaTemp = [...state.todos];
            let listaSorted = listaTemp.sort((a, b) => a.title > b.title ? 1 : (a.title < b.title ? -1 : 0) );
            console.log(listaSorted);
            return listaSorted;
        },
        todosDone(state) {
            return state.todos.filter(element => element.completed)
        },
        todosUndone(state) {
            return state.todos.filter(element => !element.completed)
        },
        doneCount(state) {
            let lista = state.todos.filter(element => element.completed);
            return lista.length;
        },
        undoneCount(state) {
            return state.todos.filter(element => !element.completed).length
        }
    },
    modules: {
    }
})
