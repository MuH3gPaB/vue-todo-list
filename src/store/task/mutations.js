const mutations = () => ({
    setIsDone(state, value) {
        state.isDone = value;
    },
    setText(state, value) {
        state.text = value;
    }
});

export default mutations;

export const SET_IS_DONE = 'setIsDone';
export const SET_TEXT = 'setText';