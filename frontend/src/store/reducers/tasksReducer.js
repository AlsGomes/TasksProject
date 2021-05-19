import { ALTER_SHOW_DONE_TASKS, GET_SHOW_DONE_TASKS, SET_TASKS } from '../actions/actionTypes'

const initialState = {
    tasks: [],
    showDoneTasks: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return { ...state, tasks: action.payload }
        case ALTER_SHOW_DONE_TASKS:
            return { ...state, showDoneTasks: action.payload }
        case GET_SHOW_DONE_TASKS:
            return { ...state, showDoneTasks: action.payload }
        default:
            return state
    }
}

export default reducer