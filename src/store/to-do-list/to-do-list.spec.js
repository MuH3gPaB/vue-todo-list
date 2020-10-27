import {afterEach, beforeEach, describe, it, jest} from "@jest/globals";
import mutations, {ADD_NEW_TASK_MUTATION, DELETE_STATE_KEY_MUTATION, SET_SEARCH_STRING} from "./mutations";
import getters from "./getters";
import actions from "./actions";
import {MODULE_NAME} from "@/store/to-do-list/index";
import {TASK_MODULE_NAME} from "@/store/task";

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

describe('getters', () => {
    let state;

    beforeEach(() => {
        state = {
            searchString: '',
            openTasksCurrentSortCode: 'OPEN_SORT',
            doneTasksCurrentSortCode: 'DONE_SORT',
            taskSortOptions: {
                OPEN_SORT: {
                    comparator() {
                        return 0;
                    }
                },
                DONE_SORT: {
                    comparator() {
                        return 0;
                    }
                }
            }
        };
    });

    describe('getOpenTaskModuleIds', () => {
        it('should filter out done tasks', () => {
            Object.assign(state, {
                Task0: {id: 0, isDone: false, text: 'Task0'},
                Task1: {id: 1, isDone: true, text: 'Task1'}
            });

            let openTaskModuleIds = getters.getOpenTaskModuleIds(state);

            expect(openTaskModuleIds).toEqual(['Task0']);
        });

        it('should consider search string', () => {
            Object.assign(state, {
                Task0: {id: 0, isDone: false, text: 'searched text'},
                Task1: {id: 1, isDone: false, text: 'other thing'},
                searchString: 'searched'
            });

            let openTaskModuleIds = getters.getOpenTaskModuleIds(state);

            expect(openTaskModuleIds).toEqual(['Task0']);
        });

        it('should sort results using configured comparator', () => {
            Object.assign(state, {
                Task0: {id: 0, isDone: false, text: 'Task0'},
                Task1: {id: 1, isDone: false, text: 'Task1'},
                taskSortOptions: {
                    OPEN_SORT: {
                        comparator(t1, t2) {
                            return t1.id < t2.id ? 1 : -1;
                        }
                    }
                }
            });

            let openTaskModuleIds = getters.getOpenTaskModuleIds(state);

            expect(openTaskModuleIds).toEqual(['Task1', 'Task0']);
        });
    });

    describe('getDoneTaskModuleIds', () => {
        it('should filter out open tasks', () => {
            Object.assign(state, {
                Task0: {id: 0, isDone: true, text: 'Task0'},
                Task1: {id: 1, isDone: false, text: 'Task1'}
            });

            let doneTaskModuleIds = getters.getDoneTaskModuleIds(state);

            expect(doneTaskModuleIds).toEqual(['Task0']);
        });

        it('should consider search string', () => {
            Object.assign(state, {
                Task0: {id: 0, isDone: true, text: 'searched text'},
                Task1: {id: 1, isDone: true, text: 'other thing'},
                searchString: 'searched'
            });

            let doneTaskModuleIds = getters.getDoneTaskModuleIds(state);

            expect(doneTaskModuleIds).toEqual(['Task0']);
        });

        it('should sort results using configured comparator', () => {
            Object.assign(state, {
                Task0: {id: 0, isDone: true, text: 'Task0'},
                Task1: {id: 1, isDone: true, text: 'Task1'},
                taskSortOptions: {
                    DONE_SORT: {
                        comparator(t1, t2) {
                            return t1.id < t2.id ? 1 : -1;
                        }
                    }
                }
            });

            let doneTaskModuleIds = getters.getDoneTaskModuleIds(state);

            expect(doneTaskModuleIds).toEqual(['Task1', 'Task0']);
        });
    });

    describe('getNextTaskId', () => {

        it('should start counting from 1', () => {
            expect(getters.getNextTaskId(state)).toBe(1);
        });

        it('should return highest id +1', () => {
            Object.assign(state, {
                Task22: {id: 22},
                Task18: {id: 18}
            });

            expect(getters.getNextTaskId(state)).toBe(23);
        });
    });
});

describe('actions', () => {
    let state;
    let commit;

    beforeEach(() => {
        state = {};
        commit = jest.fn();
    });

    describe('loadTasks', () => {
        it('should commit empty search string mutation', () => {
            actions.loadTasks({state, commit});
            expect(commit.mock.calls[0][0]).toBe(SET_SEARCH_STRING);
            expect(commit.mock.calls[0][1]).toBe('');
        });

        it('should reload task fields to modules', () => {
            Object.assign(state, {
                Task0: {id: 0, isDone: false, text: 'Task0'},
                Task1: {id: 1, isDone: true, text: 'Task1'}
            });

            actions.loadTasks({state, commit});

            [0, 1].forEach(taskId => {
                expect(commit.mock.calls[taskId * 2 + 1][0]).toBe(DELETE_STATE_KEY_MUTATION);
                expect(commit.mock.calls[taskId * 2 + 1][1]).toBe(TASK_MODULE_NAME + taskId);
                expect(commit.mock.calls[taskId * 2 + 2][0]).toBe(ADD_NEW_TASK_MUTATION);
                expect(commit.mock.calls[taskId * 2 + 2][1]).toBe(state[TASK_MODULE_NAME + taskId]);
            });
        });
    });
});
