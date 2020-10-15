<template>
  <form class="todo-list-add form-inline">
    <input
        class="new-task-input form-control input-lg"
        type="text"
        placeholder="New task..."
        formaction="#"
        v-model="newTaskText"
        @keypress.enter.prevent="onAdd"
    />
    <input
        class="btn-lg add-button"
        type="button"
        value="ADD"
        @click="onAdd"
    />
  </form>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "add-task-form",
  data() {
    return {
      newTaskText: ''
    };
  },
  methods: {
    ...mapActions('ToDoListModule', ['addNewTask']),
    onAdd() {
      if (this.newTaskText) {
        this.addNewTask(this.newTaskText);
      }
      this.newTaskText = '';
    }
  }
}
</script>

<style scoped lang="less">
@import "~bootstrap";

.todo-list-add {
  flex-basis: 10%;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px;

  .new-task-input {
    color: gray;
    padding-left: 1%;
    flex-grow: 1;
    border: none;
    border-bottom: 1px solid gray;
    border-radius: 0;
  }

  .add-button {
    flex-basis: 15%;
    margin-left: 5%;
    color: #333;
    background-color: #fff;
    border-color: #ccc;
    border-style: solid;
  }

  .add-button:hover {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
    border-style: solid;
  }
}

</style>
