import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native';
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-BR')

export async function loadTasks(daysAhead) {
    try {
        const maxDate = moment().endOf("day").add(daysAhead + 1, "day").format("YYYY-MM-DD")
        let res = null
        if (daysAhead != -1) {
            res = await axios.get(`${serverConfig.BASE_URL}/tasks/date?date=${maxDate}`)
        } else {
            res = await axios.get(`${serverConfig.BASE_URL}/tasks`)
        }
        return res.data
    } catch (e) {
        showError(e)
    }
}

export async function saveTask(newTask) {
    try {
        const res = await axios.post(`${serverConfig.BASE_URL}/tasks`, newTask)
    } catch (e) {
        showError(e)
    }
}

export async function excludeTask(taskId) {
    try {
        await axios.delete(`${serverConfig.BASE_URL}/tasks/${taskId}`)
    } catch (e) {
        showError(e)
    }
}

export async function updateTask(task) {
    try {
        await axios.put(`${serverConfig.BASE_URL}/tasks`, task)
    } catch (e) {
        showError(e)
    }
}

export async function setShowDoneTasksState(state) {
    await AsyncStorage.setItem('@tasks:showDoneTasksState', JSON.stringify(state === true ? 'true' : 'false'))
}

export async function getShowDoneTasksState() {
    let data = await AsyncStorage.getItem('@tasks:showDoneTasksState')
    data = JSON.parse(data)
    return data === 'true' ? true : false
}

export const serverConfig = {
    BASE_URL: "http://10.0.0.101:8080"
}

export function showError(err) {
    Alert.alert("Ops! Ocorreu um problema", `${err}`)
}

export function showSuccess(msg) {
    Alert.alert("Sucesso!", msg)
}