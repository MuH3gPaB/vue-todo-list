import {beforeEach, describe, it} from "@jest/globals";
import TaskBar from './task-bar';
import ToDoListModule from '@/store/to-do-list';
import TaskModule from '@/store/task';
import {createLocalVue, mount} from "vue-test-utils";
import Vuex from 'vuex';
import {mockModule} from "@/test-util/TestUtils";

function mockStore(task) {
    return mockModule({}, {
        ToDoListModule: mockModule(ToDoListModule, {
            Task0: mockModule(TaskModule(task))
        })
    });
}

describe('TaskBar', () => {
    let localVue;
    let store;
    let task;
    let wrapper;

    beforeEach(() => {
        task = {
            id: 0,
            text: 'Test Task',
            isDone: true,
            createdDate: '2020-10-15T19:24:52.829Z',
            dueDate: '2020-10-15T19:54:52.829Z'
        };

        localVue = createLocalVue();
        localVue.use(Vuex);
        store = new Vuex.Store(mockStore(task));

        wrapper = mount(TaskBar, {
            localVue,
            store,
            propsData: {
                taskModuleId: 'Task0'
            }
        });
    });

    it('should match snapshot', () => {
        expect(wrapper.vm.$el).toMatchSnapshot();
    });
});
