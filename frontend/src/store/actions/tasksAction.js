import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { serverConfig } from '../../libs/storage';
import { ALTER_SHOW_DONE_TASKS, GET_SHOW_DONE_TASKS, SET_TASKS } from './actionTypes';

export const fetchTasks = daysAhead => {
    return dispatch => {
        const maxDate = moment().endOf("day").add(daysAhead + 1, "day").format("YYYY-MM-DD")
        if (daysAhead != -1) {
            axios
                .get(`${serverConfig.BASE_URL}/tasks/date?date=${maxDate}`)
                .then(res => { dispatch({ type: SET_TASKS, payload: res.data }) })
        } else {
            axios
                .get(`${serverConfig.BASE_URL}/tasks`)
                .then(res => {
                    dispatch(setTasks(res.data))
                })
        }
    }
}

export const alterShowDoneTasks = show => {
    return dispatch => {
        AsyncStorage.setItem(
            '@tasks:showDoneTasksState',
            JSON.stringify(show)
        ).then(res => dispatch({ type: ALTER_SHOW_DONE_TASKS, payload: show }))
    }
}

export const fetchShowDoneTasks = () => {
    return dispatch => {
        AsyncStorage.getItem('@tasks:showDoneTasksState')
            .then(res => {
                dispatch({
                    type: GET_SHOW_DONE_TASKS,
                    payload: res == "true" ? true : false
                })
            })
    }
}

export const setTasks = tasks => {
    return {
        type: SET_TASKS,
        payload: tasks
    }
}