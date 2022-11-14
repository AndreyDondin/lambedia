<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li class="pagination__item" v-for="item in pages" :key="item">
        <a
          class="pagination__link"
          :class="{ 'active-link': item === page }"
          @click.prevent="$emit('update:modelValue', item)"
          >{{ item }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
export default {
  props: ['pages', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const store = useStore();
    const page = computed(() => {
      return props.modelValue;
    });

    watchEffect(() => {
      if (store.state.resetPage) {
        emit('update:modelValue', 1);
        store.commit('updateResetPage', false);
      }
    });

    return {
      page,
    };
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px auto;
  &__list {
    display: flex;
    justify-content: center;
  }
  &__item {
    margin-right: 5px;
  }
  &__link {
    padding: 5px 7px;
    text-decoration: none;
    color: #333;
    border: 1px solid #0cb4f1;
    border-radius: 3px;
    cursor: pointer;
  }
}

.active-link {
  background-color: #0cb4f1;
  color: #fff;
}
</style>
