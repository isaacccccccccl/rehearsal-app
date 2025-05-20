import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'

import { userReducer } from './reducers/user.reducer'
import { systemReducer } from './reducers/system.reducer'
import { songReducer } from './reducers/song.reducer'

const rootReducer = combineReducers({
    userModule: userReducer,
    systemModule: systemReducer,
    songModule: songReducer,
})

// Custom middleware to handle async actions
const asyncMiddleware = store => next => async action => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState)
    }
    if (action instanceof Promise) {
        return action.then(result => next(result))
    }
    return next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, asyncMiddleware))
)

