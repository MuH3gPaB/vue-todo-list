<template>
  <div>
    <AddTaskForm></AddTaskForm>
    <TaskBar></TaskBar>
    <TaskBarList></TaskBarList>
  </div>
</template>

<script>
import AddTaskForm from './add-task-form/add-task-form';
import TaskBar from './task-bar/task-bar';
import TaskBarList from './task-bar-list/task-bar-list';

export default {
  name: "task-list",
  components: {AddTaskForm, TaskBar, TaskBarList}
};
</script>

<style scoped>

</style>