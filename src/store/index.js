/***********************************************************************************************************************
 * Create Redux store with empty state. Provide methods to register reduces for the actions declared in actions.js
 *
 * Usage:
 * store.registerReducer('ACTION_NAME', function(state, action){ ...do something... }}
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

const index = createStore(defaultReducer);


// custom reducer registration map
index.reducerMap = new Map();

/**
 * Registration of custom reducer
 * @param actionType {String} - action.type on which reducer works
 * @param reducer - custom reducer function
 */
index.registerReducer = (actionType, reducer) => {
    index.reducerMap.set(actionType, reducer);
}

/**
 * The reducer which pay attention on custom reducers at reducerMap
 * @param state
 * @param action
 * @returns new state object
 */
export const commonReducer = function(state = initialState, action) {
    return (
        index.reducerMap.has(action.type)
            ? index.reducerMap.get(action.type)
            : defaultReducer
    )(state, action);
}

index.replaceReducer(commonReducer);


export default index;