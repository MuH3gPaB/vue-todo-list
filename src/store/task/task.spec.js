import mutationsFn from "./mutations";
import {beforeEach, describe, it} from "@jest/globals";

describe('mutations', () => {
    let state;
    const mutations = mutationsFn();

    beforeEach(() => {
        state = {};
    });

    describe('setIsDone', () => {
        it('should set is done', () => {
            let isDone = true;
            mutations.setIsDone(state, isDone);
            expect(state.isDone).toBe(true);
        });

        it('should set dueDate if done is true', () => {
            let isDone = true;
            mutations.setIsDone(state, isDone);
            expect(state.dueDate).toBeTruthy();
        });

        it('should reset dueDate if done is false', () => {
            let isDone = false;
            state.dueDate = new Date();
            mutations.setIsDone(state, isDone);
            expect(state.dueDate).toBeNull();
        });
    });
});
