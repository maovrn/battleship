/***********************************************************************************************************************
 * Create Redux store with empty state. Provide methods to register reduces for the actions declared in actions.js
 *
 * Usage:
 * store.registerReducer('ACTION_NAME', function(state, action){ ...do something... })
 **********************************************************************************************************************/

import { createStore } from 'redux';

const initialState = {};

/**
 * Reducer which updates all
 * @param state
 * @param action
 * @returns new state object
 */
export const defaultReducer = function(state = initialState, action) {
    if(!action) return state;
    // clone action object without type attribute
    let {type, ...newState} = action;
    return Object.assign({}, state, newState);
}

const store = createStore(defaultReducer);


// custom reducer registration map
store.reducerMap = new Map();

/**
 * Registration of custom reducer
 * @param actionType {String} - action.type on which reducer works
 * @param reducer - custom reducer function
 */
store.registerReducer = (actionType, reducer) => {
    store.reducerMap.set(actionType, reducer);
}

/**
 * The reducer which pay attention on custom reducers at reducerMap
 * @param state
 * @param action
 * @returns new state object
 */
export const commonReducer = function(state = initialState, action) {
    return (
        store.reducerMap.has(action.type)
            ? store.reducerMap.get(action.type)
            : defaultReducer
    )(state, action);
}

store.replaceReducer(commonReducer);

// Register middleware to log state updates
// store.subscribe( () => console.log('Store state', store.getState()) );

export default store;