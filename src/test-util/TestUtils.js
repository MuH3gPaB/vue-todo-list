import {jest} from "@jest/globals";

export const mockModule = function (module, childModules) {
    let mockedModule = {actions: {}, getters: {}, state: {}, modules: childModules};
    Object.keys(module.actions || []).forEach(key => mockedModule.actions[key] = jest.fn());
    Object.keys(module.getters || []).forEach(key => mockedModule.getters[key] = jest.fn());
    Object.keys(module.state || []).forEach(key => mockedModule.state[key] = module.state[key]);
    return mockedModule;
}
