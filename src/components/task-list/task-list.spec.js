import {beforeEach, describe, it} from "@jest/globals";
import TaskList from './task-list';
import ToDoListModule from '@/store/to-do-list';
import {createLocalVue, mount} from "vue-test-utils";
import Vuex from 'vuex';
import {mockModule} from "@/test-util/TestUtils";
import TaskModule from "@/store/task";

function mockStore(tasks) {
    let tasksModules = tasks.reduce((result, task, idx) => {
        return {
            ...result,
            ['Task' + idx]: mockModule(TaskModule(task))
        }
    }, {});

    return mockModule({}, {
        ToDoListModule: mockModule(ToDoListModule, tasksModules)
    });
}

describe('TaskList', () => {
    let localVue;
    let store;
    let wrapper;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(Vuex);
        store = mockStore(testTasks());
        store.modules.ToDoListModule.getters.getTasksSortOptions.mockReturnValue(testSorts());
        store.modules.ToDoListModule.getters.getOpenTaskModuleIds.mockReturnValue(['Task0', 'Task1']);
        store.modules.ToDoListModule.getters.getDoneTaskModuleIds.mockReturnValue(['Task2', 'Task3']);

        wrapper = mount(TaskList, {
            localVue,
            store: new Vuex.Store(store)
        });
    });

    it('should match snapshot', () => {
        expect(wrapper.vm.$el).toMatchSnapshot();
    });
});

function testTasks() {
    return [
        {
            id: 0,
            text: 'Test Task1',
            isDone: false,
            createdDate: '2020-10-15T19:24:52.829Z',
            dueDate: null
        },
        {
            id: 1,
            text: 'Test Task2',
            isDone: false,
            createdDate: '2020-10-15T19:24:52.829Z',
            dueDate: null
        },
        {
            id: 2,
            text: 'Test Task3',
            isDone: true,
            createdDate: '2020-10-15T19:24:52.829Z',
            dueDate: '2020-10-15T19:54:52.829Z'
        },
        {
            id: 3,
            text: 'Test Task4',
            isDone: true,
            createdDate: '2020-10-15T19:24:52.829Z',
            dueDate: '2020-10-15T19:54:52.829Z'
        },
    ];
}

function testSorts() {
    return {
        CREATED_AT_ASC: {
            label: 'Date creation (Asc)',
            comparator: (t1, t2) => (t1.createdDate > t2.createdDate ? 1 : -1)
        },
        CREATED_AT_DESC: {
            label: 'Date creation (Desc)',
            comparator: (t1, t2) => (t1.createdDate < t2.createdDate ? 1 : -1)
        },
        DUE_DATE_ASC: {
            label: 'Due date (Asc)',
            comparator: (t1, t2) => (t1.dueDate > t2.dueDate ? 1 : -1)
        },
        DUE_DATE_DESC: {
            label: 'Due date (Desc)',
            comparator: (t1, t2) => (t1.dueDate < t2.dueDate ? 1 : -1)
        },
        TEXT_ASC: {
            label: 'Text (Asc)',
            comparator: (t1, t2) => (t1.text > t2.text ? 1 : -1)
        },
        TEXT_DESC: {
            label: 'Text (Desc)',
            comparator: (t1, t2) => (t1.text < t2.text ? 1 : -1)
        }
    };
}
