import actions from "@/store/to-do-list/actions";
import getters from "@/store/to-do-list/getters";
import state from "@/store/to-do-list/state";
import mutations from "@/store/to-do-list/mutations";

export const MODULE_NAME = 'ToDoListModule';

export default {
    MODULE_NAME,
    namespaced: true,
    actions,
    getters,
    state,
    mutations
};
