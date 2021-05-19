import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux'
import tasksReducer from './reducers/tasksReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
    tasksReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig