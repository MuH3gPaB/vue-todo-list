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
    }
};

export default mutations;

export const DELETE_STATE_KEY_MUTATION = 'deleteStateKey';
export const ADD_NEW_TASK_MUTATION = 'addNewTask';
