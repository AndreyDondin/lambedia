<template>
  <main class="main">
    <h1 class="main__title">Список пользователей</h1>
    <FilterList />
    <TabelUsers />
  </main>
</template>

<script>
import FilterList from '@/components/FilterList.vue';
import TabelUsers from '@/components/TabelUsers.vue';

export default {
  components: { FilterList, TabelUsers },
  setup() {},
};
</script>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  max-width: 1000px;
  padding: 15px;

  &__title {
    margin-bottom: 20px;
    font-size: 24px;
    line-height: 28px;
  }
}
</style>
