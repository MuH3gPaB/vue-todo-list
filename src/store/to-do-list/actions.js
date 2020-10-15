import CreateTaskModule, {TASK_MODULE_NAME} from '../task';
import {MODULE_NAME} from "@/store/to-do-list/index";

const actions = {
    loadTasks({state}) {

        Object.keys(state)
            .filter(key => key.startsWith(TASK_MODULE_NAME))
            .forEach(key => {
                let task = state[key];
                let taskModule = CreateTaskModule(task);
                delete state[key];
                this.registerModule([MODULE_NAME, TASK_MODULE_NAME + task.id], taskModule);
            });

        // const tasks =
        // [
        //     {id: 0, text: 'task 0', createdDate: new Date(), dueDate: null, isDone: false},
        //     {id: 1, text: 'task 1', createdDate: new Date(), dueDate: null, isDone: false},
        //     {id: 2, text: 'task 2', createdDate: new Date(), dueDate: new Date(), isDone: true},
        // ];
    },
    setOpenTasksCurrentSortCode({commit}, value) {
        commit('setOpenTasksCurrentSortCode', value);
    },
    setDoneTasksCurrentSortCode({commit}, value) {
        commit('setDoneTasksCurrentSortCode', value);
    }
};

export default actions;
