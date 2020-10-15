import {TASK_MODULE_NAME} from "@/store/task";

const getters = {
    getOpenTaskModuleIds(state) {
        return Object.keys(state)
            .filter(key => state[key].isDone === false)
            .sort((key1, key2) => state.taskSortOptions[state.openTasksCurrentSortCode].comparator(state[key1], state[key2]));
    },
    getDoneTaskModuleIds(state) {
        return Object.keys(state)
            .filter(key => state[key].isDone === true)
            .sort((key1, key2) => state.taskSortOptions[state.doneTasksCurrentSortCode].comparator(state[key1], state[key2]));
    },
    getNextTaskId(state) {
        let currentId = Object.keys(state)
            .filter(key => key.startsWith(TASK_MODULE_NAME))
            .map(key => state[key].id)
            .sort()
            .reverse()[0];

        return currentId
            ? currentId + 1
            : 1;
    },
    getOpenTasksCurrentSort(state) {
        return state.taskSortOptions[state.openTasksCurrentSortCode];
    },
    getDoneTasksCurrentSort(state) {
        return state.taskSortOptions[state.doneTasksCurrentSortCode];
    },
    getTasksSortOptions(state) {
        return state.taskSortOptions;
    }
};

export default getters;
