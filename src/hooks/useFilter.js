import { computed } from 'vue';
import { useStore } from 'vuex';

export default function useFilter() {
  const store = useStore();
  const usersFilter = computed(() => store.getters['getFilterUsers']);
  const users = computed(() => store.getters['getUsers']);

  const filterUser = (value) => {
    store.commit('updateSorting', true);
    const filterUsers = users.value.filter(
      (user) =>
        user.username.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );
    store.commit('updateFilterUsers', filterUsers);
  };

  const userList = (page = 1) => {
    const offset = (page - 1) * 5;
    const pageUser = usersFilter.value?.slice(offset, offset + 5);
    return pageUser;
  };

  const sort = (prop, direction) => {
    store.commit('updateSorting', true);
    !direction
      ? usersFilter.value.sort((a, b) => (a[prop] > b[prop] ? -1 : 1))
      : usersFilter.value.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
  };

  const deleteUser = (id) => {
    store.commit(
      'updateFilterUsers',
      usersFilter.value.filter((item) => item.id !== id)
    );
    store.commit(
      'updateUsers',
      users.value.filter((item) => item.id !== id)
    );
  };

  return { filterUser, sort, users, usersFilter, userList, deleteUser };
}
