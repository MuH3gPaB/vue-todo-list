import CreateTaskModule, {TASK_MODULE_NAME} from "@/store/task";
import {MODULE_NAME} from "@/store/to-do-list/index";

const mutations = {
    deleteStateKey(state, key) {
        delete state[key];
    },
    setOpenTasksCurrentSortCode(state, value) {
        state.openTasksCurrentSortCode = value;
    },
    setDoneTasksCurrentSortCode(state, value) {
        state.doneTasksCurrentSortCode = value;
    },
    addNewTask(state, newTask) {
        let taskModule = CreateTaskModule(newTask);
        this.registerModule([MODULE_NAME, TASK_MODULE_NAME + newTask.id], taskModule);
    },
    deleteTask(state, taskModuleId) {
        this.unregisterModule([MODULE_NAME, taskModuleId]);
    },
    setSearchString(state, value) {
        state.searchString = value;
    }
};

export default mutations;

export const DELETE_STATE_KEY_MUTATION = 'deleteStateKey';
export const ADD_NEW_TASK_MUTATION = 'addNewTask';
export const DELETE_TASK_MUTATION = 'deleteTask';
export const SET_OPEN_TASK_SORT_CODE_MUTATION = 'setOpenTasksCurrentSortCode';
export const SET_DONE_TASK_SORT_CODE_MUTATION = 'setDoneTasksCurrentSortCode';
export const SET_SEARCH_STRING = 'setSearchString';
