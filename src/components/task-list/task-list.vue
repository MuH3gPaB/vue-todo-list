<template>
  <div>
    <task-bar-list
        :tasks-modules-ids="getOpenTaskModuleIds"
        list-name="Open"
        :task-sort-options="openTasksSortOptions"
        @sortChange="openTasksSortChanged"
    />
    <task-bar-list
        :tasks-modules-ids="getDoneTaskModuleIds"
        list-name="Done"
        :task-sort-options="doneTasksSortOptions"
        @sortChange="doneTasksSortChanged"
    />
  </div>
</template>

<script>
import TaskBarList from './task-bar-list/task-bar-list.vue'
import {mapActions, mapGetters} from "vuex";

export default {
  name: "task-list",
  components: {TaskBarList},
  methods: {
    ...mapActions('ToDoListModule', [
      'loadTasks',
      'setOpenTasksCurrentSortCode',
      'setDoneTaskCurrentSortCode'
    ]),
    openTasksSortChanged(value) {
      this.setOpenTasksCurrentSortCode(value);
    },
    doneTasksSortChanged(value) {
      this.setDoneTaskCurrentSortCode(value);
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

<style scoped>

</style>
