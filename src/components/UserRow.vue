<template>
  <tr class="tabel-tr">
    <td class="tabel-tr__td-user">{{ user.username }}</td>
    <td class="tabel-tr__td">{{ user.email }}</td>
    <td class="tabel-tr__td">{{ user.date_reg }}</td>
    <td class="tabel-tr__td">{{ user.rating }}</td>
    <td class="tabel-tr__td">
      <button @click="openModal">
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.63499 2.66666L14.3132 13.3333"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M3.63499 13.3333L14.3132 2.66665"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </td>
  </tr>
  <ModalAttention v-model:open="modalIsOpen" v-model:id="id" />
</template>

<script>
import ModalAttention from '@/components/ModalAttention.vue';
import { ref } from '@vue/reactivity';

export default {
  components: { ModalAttention },
  props: {
    user: {
      id: Number,
      username: String,
      date_reg: String,
      rating: Number,
    },
  },
  setup(props) {
    const modalIsOpen = ref(false);
    const id = ref(null);

    const openModal = () => {
      modalIsOpen.value = true;
      id.value = props.user.id;
    };

    return {
      modalIsOpen,
      openModal,
      id,
    };
  },
};
</script>

<style lang="scss" scoped>
.tabel-tr {
  &__td-user {
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    color: #0cb4f1;
  }
  &__td {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #acacac;

    &:last-child {
      text-align: center;
    }
  }
}
td {
  padding: 16px 0;
  border-bottom: 1px solid #9eaab4;
}
</style>
