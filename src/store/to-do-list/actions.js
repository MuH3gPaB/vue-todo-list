import {TASK_MODULE_NAME} from '../task';
import {ADD_NEW_TASK_MUTATION, DELETE_STATE_KEY_MUTATION} from "@/store/to-do-list/mutations";

const actions = {
    loadTasks({state, commit}) {
        Object.keys(state)
            .filter(key => key.startsWith(TASK_MODULE_NAME))
            .forEach(key => {
                let task = state[key];
                commit(DELETE_STATE_KEY_MUTATION, key);
                commit(ADD_NEW_TASK_MUTATION, task);
            });
    },
    setOpenTasksCurrentSortCode({commit}, value) {
        commit('setOpenTasksCurrentSortCode', value);
    },
    setDoneTasksCurrentSortCode({commit}, value) {
        commit('setDoneTasksCurrentSortCode', value);
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
    }
};

export default actions;
