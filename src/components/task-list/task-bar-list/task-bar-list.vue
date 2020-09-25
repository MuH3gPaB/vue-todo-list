<template>
  <div class="task-bar-list">
    <div class="bar-list-header">
      <p class="bar-list-label">{{ listName }}</p>
      <select class="form-control input-lg sort-select"
              v-if="Object.keys(taskSortOptions)[0]"
              @change="onSortChange">
        <option v-for="(sortOption, sortCode) in taskSortOptions"
                :key="sortCode"
                :value="sortCode">
          {{ sortOption.label }}
        </option>
      </select>
    </div>
    <div class="bar-list-body">
      <task-bar v-for="taskModuleId in tasksModulesIds"
                :taskModuleId="taskModuleId"
                :key="taskModuleId">
      </task-bar>
    </div>
    <div class="bar-list-footer">
      <a
          href="#"
          class="bar-list-clear"
          @click="onClear"
      >
        Clear "{{ listName }}" list
      </a>
    </div>
  </div>
</template>

<script>
import TaskBar from '../task-bar/task-bar';
import {MODULE_NAME} from "@/store/to-do-list";

export default {
  name: "task-bar-list",
  components: {
    TaskBar
  },
  props: {
    tasksModulesIds: {
      type: Array,
      default: () => []
    },
    listName: {
      type: String,
      required: true
    },
    taskSortOptions: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onClear() {
      this.tasksModulesIds.forEach(task => this.$store.unregisterModule([MODULE_NAME, task]));
    },
    onSortChange(event) {
      this.$emit('sortChange', event.target.value);
    }
  }
}
</script>

<style lang="less" scoped>
@import "~bootstrap";

.task-bar-list {
  display: flex;
  flex-basis: 45%;
  flex-direction: column;
  padding: 0 10px 0 10px;
  margin: 5px 0 10px 0;

  .bar-list-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .bar-list-label {
    font-size: large;
  }

  .sort-select {
    -webkit-appearance: none;
    width: fit-content;
    text-align-last: center;
    padding: 0.2em 30px 0.2em 0.2em;
    background-image: url(down_arrow.png);
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: 98% 70%;
  }

  .bar-list-body {
    display: flex;
    flex-direction: column;
  }

  .bar-list-footer {
    display: flex;
    flex-direction: row-reverse;
  }

  .bar-list-clear {
    text-decoration: underline;
    color: black;
  }
}

.form-control {
  border: none;
  box-shadow: none;
  border-radius: 0%;
}
</style>
