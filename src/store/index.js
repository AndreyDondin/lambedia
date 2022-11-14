import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    users: null,
    userFilter: null,
    loadingUsers: false,
    sorting: false,
    resetPage: false,
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getFilterUsers(state) {
      return state.userFilter;
    },
  },
  mutations: {
    updateUsers(state, users) {
      state.users = users;
    },
    updateSorting(state, value) {
      state.sorting = value;
    },
    updateFilterUsers(state, users) {
      state.userFilter = users;
    },
    updateResetPage(state, reset) {
      state.resetPage = reset;
    },
  },
  actions: {
    async loadUsers(context) {
      context.rootState.loadingUsers = true;
      try {
        const { data } = await axios.get(
          'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users'
        );
        const users = data.map((item) => ({
          ...item,
          date_reg: new Date(item.registration_date).toLocaleDateString(
            'ru-RU',
            {
              year: '2-digit',
              month: 'numeric',
              day: 'numeric',
            }
          ),
        }));
        context.commit('updateUsers', users);
        context.commit('updateFilterUsers', users);
      } catch (error) {
        console.log(error);
      } finally {
        context.rootState.loadingUsers = false;
      }
    },
  },
  modules: {},
});
