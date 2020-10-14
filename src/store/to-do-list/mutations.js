const mutations = {
    setOpenTasksCurrentSortCode(state, value) {
        state.openTasksCurrentSortCode = value;
    },
    setDoneTasksCurrentSortCode(state, value) {
        state.doneTasksCurrentSortCode = value;
    }
};

export default mutations;
