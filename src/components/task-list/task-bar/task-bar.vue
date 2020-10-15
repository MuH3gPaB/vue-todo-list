<template>
  <div class="task-bar"
       @mouseenter="hover = true"
       @mouseleave="hover = false"
       @dblclick="onDoubleClick">
    <div class="task">
      <input type="checkbox"
             class="form-control checkbox"
             v-model="isDone"/>

      <p class="text" v-show="!edit">
        {{ text }}
      </p>

      <keep-alive>
      <textarea class="text text-input"
                v-show="edit"
                v-model="text"
                ref="editor"
                @focusout="edit = false"
                @keydown="onTextType"
                @keydown.enter.prevent="onKeyEnter"
                @keydown.esc.prevent="onKeyEsc"
      ></textarea>
      </keep-alive>

      <div class="time">
        <p class="created">{{ createdDate }}</p>
        <p class="completed">{{ dueDate }}</p>
      </div>
    </div>
    <div class="delete" v-show="hover" @click="onDelete"></div>
  </div>
</template>

<script>
import {MODULE_NAME} from "@/store/to-do-list";
import {SET_IS_DONE, SET_TEXT} from "@/store/task/mutations";

const TIME_FORMAT = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

export default {
  name: "task-bar",
  data() {
    return {
      hover: false,
      edit: false,
      oldText: ""
    }
  },
  props: {
    taskModuleId: {
      type: String,
      required: true
    }
  },
  computed: {
    isDone: {
      get() {
        return this.task.isDone;
      },
      set(value) {
        this.commit(SET_IS_DONE, value);
      }
    },
    text: {
      get() {
        return this.task.text;
      },
      set(value) {
        this.commit(SET_TEXT, value);
      }
    },
    createdDate() {
      return this.formatDate(this.task.createdDate);
    },
    dueDate() {
      return this.formatDate(this.task.dueDate);
    },
    task() {
      return this.$store.state[MODULE_NAME][this.taskModuleId];
    }
  },
  methods: {
    commit(action, arg) {
      this.$store.commit(`${MODULE_NAME}/${this.taskModuleId}/${action}`, arg);
    },
    formatDate(date) {
      date = date instanceof Date
          ? date
          : date
              ? new Date(date)
              : date;

      return date && date.toLocaleTimeString([], TIME_FORMAT).toUpperCase();
    },
    onDelete() {
      this.$store.unregisterModule([MODULE_NAME, this.taskModuleId]);
    },
    onDoubleClick() {
      this.oldText = this.task.text;
      this.edit = true;
      this.$nextTick(() => this.$refs.editor.focus());
    },
    adjustEditorSize() {
      let editor = this.$refs.editor;
      editor.style.cssText += 'height: ' + editor.scrollHeight + 'px';
    },
    onTextType() {
      this.$nextTick(this.adjustEditorSize);
    },
    onKeyEnter() {
      this.edit = false;
    },
    onKeyEsc() {
      this.task.text = this.oldText;
      this.oldText = "";
      this.edit = false;
    }
  }
}
</script>

<style lang="less" scoped>
@import "~bootstrap";

.task-bar {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: flex-start;
  margin: 16px 0 16px 0;
  border: 1px solid gray;
  border-radius: 0.5em;
  box-shadow: 4px 4px 4px gray;

  .task {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
  }

  .checkbox {
    flex-basis: 20px;
    flex-shrink: 0;
    margin: 8px 16px 8px 16px !important;
  }

  .text {
    flex-grow: 1;
    margin: 8px;
    border: none;
    resize: none;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .time {
    flex-direction: column;
    flex-shrink: 0;
    margin: 8px;

    .created {
      color: gray;
    }

    .completed {
      color: black;
    }
  }

  .delete {
    flex-basis: 60px;
    flex-grow: 0;
    flex-shrink: 0;
    align-self: stretch;
    border-left: 1px solid gray;
    background-image: url(trash.png);
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 40%;
  }

  .delete:hover {
    opacity: 80%;
    cursor: pointer;
  }

  .delete:active {
    background-color: lightgray;
  }
}
</style>
