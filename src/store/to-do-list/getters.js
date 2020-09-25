const getters = {
    getOpenTaskModuleIds(state) {
        return Object.keys(state)
            .filter(key => state[key].isDone === false)
            .sort((key1, key2) => state.taskSortOptions[state.openTasksCurrentSortCode].comparator(state[key1], state[key2]));
    },
    getDoneTaskModuleIds(state) {
        return Object.keys(state)
            .filter(key => state[key].isDone === true)
            .sort((key1, key2) => state.taskSortOptions[state.doneTaskCurrentSortCode].comparator(state[key1], state[key2]));
    },
    getOpenTasksCurrentSort(state) {
        return state.taskSortOptions[state.openTasksCurrentSortCode];
    },
    getDoneTasksCurrentSort(state) {
        return state.taskSortOptions[state.doneTaskCurrentSortCode];
    },
    getTasksSortOptions(state) {
        return state.taskSortOptions;
    }
};

export default getters;
