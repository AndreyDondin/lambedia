<template>
  <Teleport v-if="open" to="#teleport">
    <div class="modal">
      <div class="modal__container">
        <h6 class="modal__title">
          Вы уверены, что хотите удалить пользователя?
        </h6>
        <div class="modal__btn-wrap">
          <button class="modal__btn left-btn" @click="deleteUsr">Да</button>
          <button class="modal__btn right-btn" @click="doClose">Нет</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import useFilter from '@/hooks/useFilter';
export default {
  props: ['open', 'id'],
  emits: ['update:open'],
  setup(props, { emit }) {
    const { deleteUser } = useFilter();

    const doClose = () => {
      emit('update:open', false);
    };
    const deleteUsr = () => {
      deleteUser(props.id);
    };
    return {
      doClose,
      deleteUsr,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;

  &__container {
    padding: 36px;
    background: #fff;
    border-radius: 7px;
  }
  &__title {
    margin-bottom: 24px;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }
  &__btn-wrap {
    display: flex;
    justify-content: space-between;
  }
  &__btn {
    padding: 6px 36px;
    border-radius: 3px;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }

  .left-btn {
    background: #e0e0e0;
    color: #828282;
  }

  .right-btn {
    background: #0cb4f1;
    color: #fff;
  }
}
</style>
