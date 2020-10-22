import {beforeEach, describe, it} from "@jest/globals";
import TaskBarList from './task-bar-list';
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

describe('TaskBarList', () => {
    let localVue;
    let store;
    let wrapper;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(Vuex);
        store = new Vuex.Store(mockStore(testTasks()));

        wrapper = mount(TaskBarList, {
            localVue,
            store,
            propsData: {
                listName: 'testList',
                tasksModulesIds: ['Task0', 'Task1', 'Task2'],
                taskSortOptions: {
                    sortOne: {
                        label: 'SortOne'
                    },
                    sortTwo: {
                        label: 'SortTwo'
                    }
                },
                currentSortCode: 'sortOne'
            }
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
            isDone: true,
            createdDate: '2020-10-15T19:24:52.829Z',
            dueDate: '2020-10-15T19:54:52.829Z'
        },
        {
            id: 1,
            text: 'Test Task2',
            isDone: true,
            createdDate: '2020-10-15T19:24:52.829Z',
            dueDate: '2020-10-15T19:54:52.829Z'
        },
        {
            id: 2,
            text: 'Test Task3',
            isDone: true,
            createdDate: '2020-10-15T19:24:52.829Z',
            dueDate: '2020-10-15T19:54:52.829Z'
        },
    ];
}
