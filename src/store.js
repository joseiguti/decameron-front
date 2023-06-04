import { createStore } from 'vuex';

const store = createStore({
    state: {
        count: 0,
        parameters: [],
        isLoading: true
    },
    mutations: {
        UPDATE_PARAMETERS(state, parameters){
            state.parameters = parameters
        },
        UPDATE_IS_LOADING (state, newValue){
            state.isLoading = newValue
        }
    },
    actions: {
        showLoading({ commit }){
            commit('UPDATE_IS_LOADING', true)
        },
        stopLoading({ commit }){
            commit('UPDATE_IS_LOADING', false)
        },
        async fetchParameters({ commit }) {
            if (this.state.parameters.length === 0){
                fetch('http://localhost:8000/api/parameters')
                    .then(response => response.json())
                    .then(data => {

                        data.unshift({id: null, nombre: 'Seleccione...'})

                        commit('UPDATE_PARAMETERS', data);
                        commit('UPDATE_IS_LOADING', false)
                    })
                    .catch(error => {
                        console.error('Error fetching parameters', error);
                    });
            }
        }
    }
});

export default store;