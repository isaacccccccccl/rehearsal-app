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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })