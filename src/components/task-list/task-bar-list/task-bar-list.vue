<template>
  <div class="todo-list__list todo-list__open-list">
    <div class="list__head">
      <p class="list__label">Open</p>
      <select class="form-control input-lg list__sort-select underlined--gray">
      </select>
    </div>
    <div class="list__body">
      <task-bar v-for="task in getTasks" :task="task" :key="task.id"></task-bar>
    </div>
    <div class="list__footer">
      <a href="#" class="todo-list__clear">Clear "Open" list</a>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import TaskBar from '../task-bar/task-bar';

export default {
  name: "task-bar-list",
  components: {
    TaskBar
  },
  computed: {
    ...mapGetters('ToDoListModule', ['getTasks'])
  }
}
</script>

<style scoped>
.todo-list__list {
  display: flex;
  flex-basis: 45%;
  flex-direction: column;
  padding: 0px 10px 0px 10px;
  margin: 5px 0px 10px 0px;
}

.list__head {
  align-items: baseline;
  justify-content: space-between;
}

.list__label {
  font-size: large;
}

.list__sort-select {
  -webkit-appearance: none;
  width: fit-content;
  text-align-last: center;
  padding: 0.2em;
  padding-right: 30px;
  /*background-image: url(../icons/down_arrow.png);*/
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: 98% 70%;
}

.list__body {
  flex-direction: column;
}

.list__footer {
  flex-direction: row-reverse;
}

.todo-list__clear {
  text-decoration: underline;
  color: black;
}

.form-control {
  border: none;
  box-shadow: none;
  border-radius: 0%;
}
</style>