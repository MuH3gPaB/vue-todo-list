import {TASK_MODULE_NAME} from '../task';
import {
    ADD_NEW_TASK_MUTATION,
    DELETE_STATE_KEY_MUTATION,
    DELETE_TASK_MUTATION,
    SET_DONE_TASK_SORT_CODE_MUTATION,
    SET_OPEN_TASK_SORT_CODE_MUTATION,
    SET_SEARCH_STRING
} from "@/store/to-do-list/mutations";

const actions = {
    loadTasks({state, commit}) {
        commit(SET_SEARCH_STRING, '');
        Object.keys(state)
            .filter(key => key.startsWith(TASK_MODULE_NAME))
            .forEach(key => {
                let task = state[key];
                commit(DELETE_STATE_KEY_MUTATION, key);
                commit(ADD_NEW_TASK_MUTATION, task);
            });
    },
    setOpenTasksCurrentSortCode({commit}, value) {
        commit(SET_OPEN_TASK_SORT_CODE_MUTATION, value);
    },
    setDoneTasksCurrentSortCode({commit}, value) {
        commit(SET_DONE_TASK_SORT_CODE_MUTATION, value);
    },
    addNewTask({commit, getters}, taskText) {
        let newTask = {
            id: getters.getNextTaskId,
            text: taskText,
            createdDate: new Date(),
            dueDate: null,
            isDone: false
        }

        commit(ADD_NEW_TASK_MUTATION, newTask);
    },
    deleteTask({commit}, taskModuleId) {
        commit(DELETE_TASK_MUTATION, taskModuleId);
    },
    performSearch({commit}, searchString) {
        commit(SET_SEARCH_STRING, searchString);
    }
};

export default actions;
