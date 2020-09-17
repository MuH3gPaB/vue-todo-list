<template>
  <div class="task-bar"
       @mouseenter="hover = true"
       @mouseleave="hover = false"
       @dblclick="onDoubleClick">
    <div class="task">
      <input type="checkbox"
             class="form-control checkbox"
             v-model="this.task.isDone"/>

      <p class="text" v-show="!edit">
        {{ task.text }}
      </p>

      <textarea class="text text-input"
                v-show="edit"
                v-model="task.text"
                ref="editor"
                @focusout="edit = false"
                @keydown="onTextType"
                @keydown.enter.prevent="onKeyEnter"
                @keydown.esc.prevent="onKeyEsc"
      ></textarea>

      <div class="time">
        <p class="created">{{ createdDate }}</p>
        <p class="completed">{{ dueDate }}</p>
      </div>
    </div>
    <div class="delete" v-show="hover" @click="onDelete"></div>
  </div>
</template>

<script>
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
    task: {
      type: Object,
      defaultValue: {}
    }
  },
  computed: {
    createdDate() {
      return this.formatDate(this.task.createdDate);
    },
    dueDate() {
      return this.formatDate(this.task.dueDate);
    }
  },
  methods: {
    formatDate(date) {
      return date && date.toLocaleTimeString([], TIME_FORMAT).toUpperCase();
    },
    onDelete() {
      this.$emit('task-deleted', this.task);
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