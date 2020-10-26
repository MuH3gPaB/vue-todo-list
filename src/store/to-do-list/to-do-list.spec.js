import {afterEach, beforeEach, describe, it, jest} from "@jest/globals";
import mutations from "./mutations";
import {MODULE_NAME} from "@/store/to-do-list/index";

jest.mock('@/store/task', () => {
    let module = (task) => task;
    module['TASK_MODULE_NAME'] = 'Task'
    return module;
});

describe('mutations', () => {
    let state;

    beforeEach(() => {
        state = {};
    });

    describe('deleteStateKey', () => {
        it('should delete state key', () => {
            let key = 'someKey';
            state[key] = 'someValue';
            mutations.deleteStateKey(state, key)
            expect(state[key]).toBeUndefined();
        });
    });

    describe('setOpenTasksCurrentSortCode', () => {
        it('should set open tasks current sort code', () => {
            let value = 'someSortCode';
            mutations.setOpenTasksCurrentSortCode(state, value);
            expect(state.openTasksCurrentSortCode).toBe(value);
        });
    });

    describe('setDoneTasksCurrentSortCode', () => {
        it('should set done tasks current sort code', () => {
            let value = 'someSortCode';
            mutations.setDoneTasksCurrentSortCode(state, value);
            expect(state.doneTasksCurrentSortCode).toBe(value);
        });
    });

    describe('addNewTask', () => {
        let newTask;

        beforeEach(() => {
            newTask = {};
            mutations.registerModule = jest.fn();
        });

        afterEach(() => {
            delete mutations.registerModule;
        });

        it('should register new task module', () => {
            newTask.id = 1;
            mutations.addNewTask(state, newTask);
            expect(mutations.registerModule.mock.calls[0][0][0]).toBe(MODULE_NAME);
            expect(mutations.registerModule.mock.calls[0][0][1]).toBe('Task1');
            expect(mutations.registerModule.mock.calls[0][1]).toEqual(newTask);
        });
    });

    describe('deleteTask', () => {
        beforeEach(() => {
            mutations.unregisterModule = jest.fn();
        });

        afterEach(() => {
            delete mutations.unregisterModule;
        });

        it('should unregister module', () => {
            let taskId = 'TaskModuleName';
            mutations.deleteTask(state, taskId);
            expect(mutations.unregisterModule.mock.calls[0][0][0]).toBe(MODULE_NAME);
            expect(mutations.unregisterModule.mock.calls[0][0][1]).toBe(taskId);
        });
    });

    describe('setSearchString', () => {
        it('should set search string', () => {
            let value = 'searchString';
            mutations.setSearchString(state, value);
            expect(state.searchString).toBe(value);
        });
    });
});
