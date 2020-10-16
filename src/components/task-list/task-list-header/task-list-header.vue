<template>
  <div>
    <div class="todo-list-header form-inline">
      <label class="todo-list-label" for="search-input">Todo List</label>
      <input
          class="input-lg form-control search-input"
          type="text"
          placeholder="Search..."
          id="search-input"
          v-model.trim="searchString"
          @keypress.enter="$event.target.blur()"
      />
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "task-list-header",
  data() {
    return {
      searchString: ''
    };
  },
  methods: {
    ...mapActions('ToDoListModule', ['performSearch'])
  },
  watch: {
    searchString(value) {
      this.performSearch(value);
    }
  }
}
</script>

<style scoped lang="less">
@import "~bootstrap";

.todo-list-header {
  justify-content: space-between;
  flex-grow: 0;
  flex-basis: content;
  padding: 1% 8% 1% 8%;
  align-items: center;
  background-color: cadetblue;
  font-size: x-large;
  color: white;

  .todo-list-label {
    flex-shrink: 0;
  }

  .search-input::placeholder {
    color: white;
  }

  .search-input {
    color: white;
    background: transparent url("lens.png") no-repeat 98% 60%;
    background-size: 20px;
    padding-right: 10%;
    padding-left: 1%;
    flex-basis: 40%;
    flex-grow: 0.3;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid white;
  }
}

</style>
