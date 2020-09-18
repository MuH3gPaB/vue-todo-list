import actions from "@/store/task/actions";
import getters from "@/store/task/getters";
import state from "@/store/task/state";
import mutations from "@/store/task/mutations";

export default (task) => ({
    namespaced: true,
    actions: actions(),
    getters: getters(),
    state: state(task),
    mutations: mutations()
});

export const TASK_MODULE_NAME = 'Task';