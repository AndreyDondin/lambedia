<template>
  <div class="tabel">
    <div class="tabel__sort-wrap">
      <span class="tabel__sort-text">Сортировка: </span>
      <button
        class="tabel__sort-btn"
        :class="{ 'active-sort': direction }"
        @click="sorting('registration_date')"
      >
        Дата регистрации
      </button>
      <button
        class="tabel__sort-btn"
        @click="sorting('rating')"
        :class="{ 'active-sort': !direction }"
      >
        Рейтинг
      </button>
    </div>
    <table class="tabel__table">
      <thead class="tabel__thead">
        <tr class="tabel__row">
          <td class="tabel__title">Имя пользователя</td>
          <td class="tabel__title">E-mail</td>
          <td class="tabel__title">Дата регистрации</td>
          <td class="tabel__title">Рейтинг</td>
          <td class="tabel__title"></td>
        </tr>
      </thead>
      <tbody class="tabel__tbody">
        <SpinnerLoading v-if="$store.state.loadingUsers" />
        <UserRow
          v-else-if="$store.state.userFilter"
          v-for="user in users"
          :key="user.id"
          :user="user"
        />
      </tbody>
    </table>
    <PaginationUser
      v-if="$store.state.userFilter"
      :pages="pages"
      v-model="page"
    />
  </div>
</template>

<script>
import UserRow from '@/components/UserRow.vue';
import PaginationUser from '@/components/PaginationUser.vue';
import { useStore } from 'vuex';
import { ref, watchEffect } from '@vue/runtime-core';
import SpinnerLoading from '@/uiComponents/SpinnerLoading.vue';
import useFilter from '@/hooks/useFilter';

export default {
  components: { UserRow, SpinnerLoading, PaginationUser },
  setup() {
    const store = useStore();
    const direction = ref(false);
    const users = ref(null);
    const pages = ref(1);
    const page = ref(1);

    const { sort, usersFilter, userList } = useFilter();

    const sorting = (prop) => {
      sort(prop, direction.value);
      direction.value = !direction.value;
    };
    store.dispatch('loadUsers');

    watchEffect(() => {
      users.value = userList(page.value);
      pages.value = Math.ceil(usersFilter.value?.length / 5);
    });

    return {
      sort,
      sorting,
      direction,
      users,
      pages,
      page,
    };
  },
};
</script>

<style lang="scss" scoped>
.tabel {
  &__sort-wrap {
    margin-bottom: 15px;
  }
  &__sort-text {
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #9eaab4;
  }
  &__sort-btn {
    margin-right: 10px;
    width: fit-content;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #9eaab4;
    border-bottom: 1px dashed #9eaab4;
  }
  &__table {
    padding: 16px;
    width: 100%;
    border-radius: 7px;
    background: #fff;
  }
  td {
    padding: 16px 0;
    border-bottom: 1px solid #9eaab4;
  }
  &__title {
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #9eaab4;
  }
  &__tbody {
    position: relative;
  }
}
.active-sort {
  color: #333;
  border-color: #333;
}
</style>
