<template>
  <div>
    <task-bar-list></task-bar-list>
  </div>
</template>

<script>
import TaskBarList from './task-bar-list/task-bar-list.vue'

export default {
  name: "task-list",
  components: {TaskBarList}
};
</script>

<style scoped>

</style>