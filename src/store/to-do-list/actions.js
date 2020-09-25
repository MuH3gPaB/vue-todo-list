import CreateTaskModule, {TASK_MODULE_NAME} from '../task';
import {MODULE_NAME} from "@/store/to-do-list/index";

const actions = {
    loadTasks() {
        const tasks = [
            {id: 0, text: 'task 0', createdDate: new Date(), dueDate: null, isDone: false},
            {id: 1, text: 'task 1', createdDate: new Date(), dueDate: null, isDone: false},
            {id: 2, text: 'task 2', createdDate: new Date(), dueDate: new Date(), isDone: true},
        ];

        tasks.forEach(task => {
            let taskModule = CreateTaskModule(task);
            this.registerModule([MODULE_NAME, TASK_MODULE_NAME + task.id], taskModule);
        });
    },
    setOpenTasksCurrentSortCode({commit}, value) {
        commit('setOpenTasksCurrentSortCode', value);
    },
    setDoneTaskCurrentSortCode({commit}, value) {
        commit('setDoneTaskCurrentSortCode', value);
    }
};

export default actions;
