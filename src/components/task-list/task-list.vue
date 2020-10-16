<template>
  <div class="task-list">
    <div class="task-list-container">
      <task-list-header></task-list-header>
      <add-task-form>
      </add-task-form>
      <task-bar-list
          :tasks-modules-ids="getOpenTaskModuleIds"
          list-name="Open"
          :task-sort-options="openTasksSortOptions"
          :current-sort-code="openTasksCurrentSortCode"
          @sortChange="openTasksSortChanged"
      />
      <task-bar-list
          :tasks-modules-ids="getDoneTaskModuleIds"
          list-name="Done"
          :task-sort-options="doneTasksSortOptions"
          :current-sort-code="doneTasksCurrentSortCode"
          @sortChange="doneTasksSortChanged"
      />
    </div>
  </div>
</template>

<script>
import TaskBarList from './task-bar-list/task-bar-list.vue'
import {mapActions, mapGetters, mapState} from "vuex";
import AddTaskForm from "@/components/task-list/add-task-form/add-task-form";
import TaskListHeader from "@/components/task-list/task-list-header/task-list-header";

export default {
  name: "task-list",
  components: {TaskListHeader, AddTaskForm, TaskBarList},
  methods: {
    ...mapActions('ToDoListModule', [
      'loadTasks',
      'setOpenTasksCurrentSortCode',
      'setDoneTasksCurrentSortCode'
    ]),
    openTasksSortChanged(value) {
      this.setOpenTasksCurrentSortCode(value);
    },
    doneTasksSortChanged(value) {
      this.setDoneTasksCurrentSortCode(value);
    }
  },
  computed: {
    ...mapGetters('ToDoListModule', [
      'getOpenTaskModuleIds',
      'getDoneTaskModuleIds',
      'getTasksSortOptions',
      'getOpenTasksCurrentSort',
      'getDoneTasksCurrentSort'
    ]),

    ...mapState('ToDoListModule', [
      'openTasksCurrentSortCode',
      'doneTasksCurrentSortCode'
    ]),

    openTasksSortOptions() {
      const {CREATED_AT_ASC, CREATED_AT_DESC, TEXT_ASC, TEXT_DESC} = this.getTasksSortOptions;
      return {CREATED_AT_ASC, CREATED_AT_DESC, TEXT_ASC, TEXT_DESC};
    },

    doneTasksSortOptions() {
      const {DUE_DATE_ASC, DUE_DATE_DESC, TEXT_ASC, TEXT_DESC} = this.getTasksSortOptions;
      return {DUE_DATE_ASC, DUE_DATE_DESC, TEXT_ASC, TEXT_DESC};
    }
  },
  mounted() {
    this.loadTasks();
  }
};
</script>

<style scoped lang="less">
.task-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .task-list-container {
    max-width: 800px;
    min-width: 300px;
    flex-basis: 800px;
  }
}
</style>
